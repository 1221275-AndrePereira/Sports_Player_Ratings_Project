import pandas as pd
import cloudscraper
import os
import sys
from io import StringIO

# Ensure proper UTF-8 encoding for console output on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        import codecs
        sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')

def create_scraper():
    return cloudscraper.create_scraper()  # Automatically handles Cloudflare protection

def get_players_in_season(season_year, scraper, output_file=None):
    print(f"\n[*] Fetching players from the {season_year} NFL season...")
    
    # Set default output file to current directory if not specified
    if output_file is None:
        output_file = os.path.join(os.getcwd(), f"nfl_{season_year}_players.txt")
    
    url = f"https://www.pro-football-reference.com/years/{season_year}/fantasy.htm"
    try:
        response = scraper.get(url, timeout=10)
        response.raise_for_status()
        response.encoding = 'utf-8'  # Ensure UTF-8 encoding

        # Read all tables from the page
        tables = pd.read_html(StringIO(response.text))
        print(f"[+] Found {len(tables)} table(s) on the page")
        
        # Use the first table (usually the per game stats)
        df = tables[0]
        
        # Handle MultiIndex columns (flatten if present)
        if isinstance(df.columns, pd.MultiIndex):
            print(f"[DEBUG] MultiIndex columns detected, flattening...")
            # Take the second level of the MultiIndex (the actual column names)
            df.columns = df.columns.get_level_values(1)
        
        # Remove duplicated header rows (where Player column equals "Player")
        df = df[df["Player"] != "Player"]
        
        # Remove special rows like "League Average"
        if "Player" in df.columns:
            df = df[~df["Player"].str.contains("League Average", na=False)]

        # Clean column names
        df.columns = df.columns.str.strip()

        # Rename legacy columns to match expected names
        column_renames = {
            "Team": "Tm",
            "Position": "Pos",
            "FantPos": "Pos",  # Fantasy Position is the position column
        }
        df = df.rename(columns=column_renames)

        # Check if we have the expected columns
        expected_cols = ["Player", "Pos", "Tm"]
        missing_cols = [col for col in expected_cols if col not in df.columns]
        
        if missing_cols:
            print(f"[!] Available columns: {df.columns.tolist()}")
            print(f"[X] Missing columns: {missing_cols}")
            raise KeyError(f"Expected columns {missing_cols} not found in the table.")

        # Keep only relevant columns
        df = df[["Player", "Pos", "Tm"]]
        
        # Remove rows with NaN values
        df = df.dropna(subset=["Player", "Tm"])
        
        # Drop duplicates based on Player, Team, and Position
        df = df.drop_duplicates(subset=["Player", "Tm", "Pos"])
        
        # Reset index
        df = df.reset_index(drop=True)

        # Prepare string output
        output_lines = [f"NFL {season_year} Season - Player List ({len(df)} entries):\n"]
        for _, row in df.iterrows():
            line = f"  - {row['Player']:30} | {str(row['Pos']):5} | {row['Tm']}"
            output_lines.append(line)

        # Write to file with error handling
        try:
            # Get absolute path
            abs_output_file = os.path.abspath(output_file)
            output_dir = os.path.dirname(abs_output_file)
            
            # Ensure the directory exists
            if output_dir and not os.path.exists(output_dir):
                os.makedirs(output_dir, exist_ok=True)
            
            with open(abs_output_file, "w", encoding="utf-8") as f:
                f.write("\n".join(output_lines))
            
            print(f"\n[SUCCESS] Saved {len(df)} player entries to:")
            print(f"   {abs_output_file}")
        except Exception as file_error:
            print(f"\n[WARNING] Could not save to file: {file_error}")
            print(f"   Attempted location: {os.path.abspath(output_file)}")
            print(f"   Data retrieved successfully, but file save failed.")
            print(f"\n   Showing first 10 players instead:")
            for i, row in df.head(10).iterrows():
                print(f"     {row['Player']:30} | {str(row['Pos']):5} | {row['Tm']}")
        
        # Show a sample of the data
        print(f"\n[SAMPLE] First 5 players:")
        for i, row in df.head().iterrows():
            print(f"  {row['Player']:30} | {str(row['Pos']):5} | {row['Tm']}")
        
        return df
        
    except IndexError as e:
        print(f"[ERROR] Could not find the stats table. The page structure may have changed.")
        print(f"   Error details: {e}")
        return pd.DataFrame()
    except KeyError as e:
        print(f"[ERROR] Column structure error: {e}")
        return pd.DataFrame()
    except Exception as e:
        print(f"[ERROR] Failed to load season data for {season_year}: {e}")
        print(f"   Error type: {type(e).__name__}")
        return pd.DataFrame()

if __name__ == "__main__":
    try:
        year = int(input("Enter the NFL season year (e.g., 2023): "))
        scraper = create_scraper()
        df = get_players_in_season(year, scraper)
        
        if not df.empty:
            print(f"\n[OK] Successfully fetched {len(df)} players!")
            
            # Ask if user wants to see all data
            show_all = input("\nWould you like to see all players? (y/n): ").lower()
            if show_all == 'y':
                for i, row in df.iterrows():
                    print(f"{i+1:3}. {row['Player']:30} | {str(row['Pos']):5} | {row['Tm']}")
        else:
            print("\n[WARNING] No data was retrieved. Please check the error messages above.")
            
    except ValueError:
        print("[ERROR] Please enter a valid year (e.g., 2023)")
    except KeyboardInterrupt:
        print("\n\n[INFO] Operation cancelled by user.")