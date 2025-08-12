import os
import time
import datetime
import threading
import winsound  # Windows beep
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Path to your persistent Selenium profile
SELENIUM_PROFILE_PATH = r"C:\SeleniumAutomationProfile"

# Booking page URL
TARGET_URL = (
    "https://www.econsulat.ro/Dosar/Programare?"
    "dosarId=83074239-bdae-4bbc-9af3-dff375f657ef"
    "&ziProgramare=12%2F01%2F2025%2000%3A00%3A00"
    "&interval=2"
    "&oraInceput=00%3A00%3A00"
    "&oraSfarsit=23%3A30%3A00"
)

DAYS_AHEAD = 120       # ~4 months
DATE_DELAY = 0.4       # seconds between date checks

beeping = False

def start_beeping():
    """Plays a continuous beep until stopped."""
    global beeping
    beeping = True
    while beeping:
        winsound.Beep(1000, 500)  # frequency, duration
        time.sleep(0.1)

def stop_beeping():
    global beeping
    beeping = False

def open_browser():
    chrome_options = Options()
    chrome_options.add_argument(f"--user-data-dir={SELENIUM_PROFILE_PATH}")
    chrome_options.add_argument("--profile-directory=Default")
    chrome_options.add_argument("--enable-extensions")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    service = Service(log_path=os.devnull)
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(TARGET_URL)
    return driver

def check_dates(driver):
    wait = WebDriverWait(driver, 10)
    today = datetime.date.today()

    for offset in range(DAYS_AHEAD):
        check_date = today + datetime.timedelta(days=offset)
        date_str = check_date.strftime("%d.%m.%Y")

        try:
            # Click & clear date input
            date_input = wait.until(EC.presence_of_element_located((By.ID, "DataReferintaCautare")))
            date_input.click()
            date_input.send_keys(Keys.CONTROL + "a")
            date_input.send_keys(Keys.BACKSPACE)
            time.sleep(1.5)

            # Enter new date
            date_input.send_keys(date_str)

            # Click search button
            search_button = driver.find_element(By.NAME, "submitButton")
            search_button.click()

            # Wait for scheduler table to appear
            table = wait.until(EC.presence_of_element_located(
                (By.CSS_SELECTOR, ".k-scheduler-content .k-scheduler-table")
            ))

            # Check if table contains any slots
            slots = table.find_elements(By.TAG_NAME, "td")
            if len(slots) > 0:
                print(f"✅ Found availability on {date_str}")
                return date_str
            else:
                print(f"❌ No availability on {date_str}")

        except Exception as e:
            print(f"⚠ Error checking {date_str}: {e}")

        time.sleep(DATE_DELAY)

    return None

def book_first_slot(driver):
    """Click the first available slot and confirm with 'Save the schedule'."""
    wait = WebDriverWait(driver, 10)
    try:
        # Find and click first slot
        table = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, ".k-scheduler-content .k-scheduler-table")
        ))
        slots = table.find_elements(By.TAG_NAME, "td")
        if slots:
            slots[0].click()
            print("🖱️ Clicked first available slot")
        else:
            print("⚠ No slots to click")
            return

        # Wait for "Save the schedule" button and click it
        save_button = wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(., 'Save the schedule')]")
        ))
        save_button.click()
        print("💾 Clicked 'Save the schedule' button")

    except Exception as e:
        print(f"⚠ Could not auto-book: {e}")

def main():
    driver = open_browser()
    try:
        while True:
            print(f"[{datetime.datetime.now()}] Scanning for next {DAYS_AHEAD} days...")
            found_date = check_dates(driver)
            if found_date:
                # Start beeping in background
                threading.Thread(target=start_beeping, daemon=True).start()

                # Try to book the first slot
                book_first_slot(driver)

                # Wait for user to acknowledge
                input("🚨 Press Enter to stop beeping...")
                stop_beeping()
                break
            else:
                print("🔄 Restarting scan from the beginning...")
                driver.refresh()
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
