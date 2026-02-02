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
    print(f"\n[*] Fetching players from the {season_year} NHL season...")
    
    # Set default output file to current directory if not specified
    if output_file is None:
        output_file = os.path.join(os.getcwd(), f"nhl_{season_year}_players.txt")
    
    url_goalies = f"https://www.hockey-reference.com/leagues/NHL_{season_year}_goalies.html"
    url_skaters = f"https://www.hockey-reference.com/leagues/NHL_{season_year}_skaters.html"
    
    all_dataframes = []
    
    # Fetch goalies data
    try:
        print(f"[*] Fetching goalies data...")
        response = scraper.get(url_goalies, timeout=10)
        response.raise_for_status()
        response.encoding = 'utf-8'

        tables = pd.read_html(StringIO(response.text))
        print(f"[+] Found {len(tables)} table(s) on goalies page")
        
        df_goalies = tables[0]
        
        # Handle multi-level columns FIRST (before using .str)
        if isinstance(df_goalies.columns, pd.MultiIndex):
            # Flatten MultiIndex: take second level if it exists and isn't empty, otherwise first level
            df_goalies.columns = [col[1] if col[1] and not col[1].startswith('Unnamed') else col[0] for col in df_goalies.columns.values]
        
        # Now clean column names
        df_goalies.columns = df_goalies.columns.str.strip()
        
        # Remove duplicated header rows
        if "Player" in df_goalies.columns:
            df_goalies = df_goalies[df_goalies["Player"] != "Player"]
            df_goalies = df_goalies[~df_goalies["Player"].str.contains("League Average", na=False)]

        column_renames = {"Team": "Tm", "Position": "Pos"}
        df_goalies = df_goalies.rename(columns=column_renames)

        # Ensure Pos column exists for goalies
        if "Pos" not in df_goalies.columns:
            df_goalies["Pos"] = "G"
        
        if "Player" in df_goalies.columns and "Tm" in df_goalies.columns:
            df_goalies = df_goalies[["Player", "Pos", "Tm"]]
            df_goalies = df_goalies.dropna(subset=["Player", "Tm"])
            all_dataframes.append(df_goalies)
            print(f"[+] Successfully fetched {len(df_goalies)} goalies")
        else:
            print(f"[!] Missing expected columns in goalies table")
            print(f"[!] Available: {df_goalies.columns.tolist()}")
            
    except Exception as e:
        print(f"[WARNING] Failed to fetch goalies data: {e}")
    
    # Fetch skaters data
    try:
        print(f"[*] Fetching skaters data...")
        response = scraper.get(url_skaters, timeout=10)
        response.raise_for_status()
        response.encoding = 'utf-8'

        tables = pd.read_html(StringIO(response.text))
        print(f"[+] Found {len(tables)} table(s) on skaters page")
        
        df_skaters = tables[0]
        
        # Handle multi-level columns FIRST (before using .str)
        if isinstance(df_skaters.columns, pd.MultiIndex):
            # Flatten MultiIndex: take second level if it exists and isn't empty, otherwise first level
            df_skaters.columns = [col[1] if col[1] and not col[1].startswith('Unnamed') else col[0] for col in df_skaters.columns.values]
        
        # Now clean column names
        df_skaters.columns = df_skaters.columns.str.strip()
        
        # Remove duplicated header rows
        if "Player" in df_skaters.columns:
            df_skaters = df_skaters[df_skaters["Player"] != "Player"]
            df_skaters = df_skaters[~df_skaters["Player"].str.contains("League Average", na=False)]

        column_renames = {"Team": "Tm", "Position": "Pos"}
        df_skaters = df_skaters.rename(columns=column_renames)

        if "Player" in df_skaters.columns and "Tm" in df_skaters.columns and "Pos" in df_skaters.columns:
            df_skaters = df_skaters[["Player", "Pos", "Tm"]]
            df_skaters = df_skaters.dropna(subset=["Player", "Tm"])
            all_dataframes.append(df_skaters)
            print(f"[+] Successfully fetched {len(df_skaters)} skaters")
        else:
            print(f"[!] Missing expected columns in skaters table")
            print(f"[!] Available: {df_skaters.columns.tolist()}")
            
    except Exception as e:
        print(f"[WARNING] Failed to fetch skaters data: {e}")
    
    # Combine both dataframes
    if not all_dataframes:
        print(f"[ERROR] No data was retrieved from either source")
        return pd.DataFrame()
    
    try:
        df = pd.concat(all_dataframes, ignore_index=True)
        print(f"[+] Combined data: {len(df)} total players")
        
        # Drop duplicates based on Player, Team, and Position
        df = df.drop_duplicates(subset=["Player", "Tm", "Pos"])
        
        # Reset index
        df = df.reset_index(drop=True)
        print(f"[+] After removing duplicates: {len(df)} unique players")

        print(f"[+] After removing duplicates: {len(df)} unique players")

        # Prepare string output
        output_lines = [f"NHL {season_year} Season - Player List ({len(df)} entries):\n"]
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
        
    except Exception as e:
        print(f"[ERROR] An unexpected error occurred: {e}")
        print(f"   Error type: {type(e).__name__}")
        return pd.DataFrame()

if __name__ == "__main__":
    try:
        year = int(input("Enter the NHL season year (e.g., 2023): "))
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