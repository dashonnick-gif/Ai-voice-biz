#!/usr/bin/env python3
import sys
import time

def print_agent(text):
    print("\033[94m[VoxLocal Lucy]\033[0m: ", end="")
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(0.015)
    print()

def print_system(text):
    print(f"\033[93m{text}\033[0m")

def main():
    print_system("=================================================================")
    print_system("     VoxLocal AI Voice Agent Demo: BrightSmile Dental Clinic     ")
    print_system("=================================================================")
    print_system("System: Phone call simulation starting... (Press Ctrl+C to hang up)")
    time.sleep(1)
    print_system("[Phone Ringing...]")
    time.sleep(1.5)
    print_system("[Call Connected]")
    time.sleep(0.5)

    # State machine variables
    step = 0
    sarah_name = ""
    sarah_phone = ""
    chosen_time = ""

    print_agent("Thank you for calling BrightSmile Dental Clinic. This is your AI assistant. How can I help you today?")

    while True:
        try:
            user_input = input("\033[92m[You]\033[0m: ").strip()
        except (KeyboardInterrupt, EOFError):
            print()
            print_system("[Call Disconnected]")
            break

        if not user_input:
            continue

        if step == 0:
            # User wants to book or general query
            lower_input = user_input.lower()
            if "book" in lower_input or "appointment" in lower_input or "schedule" in lower_input or "cleaning" in lower_input or "toothache" in lower_input:
                print_agent("I'm sorry to hear about your toothache. We can certainly get you scheduled for a cleaning and have the doctor take a look at that tooth. Are you a new or returning patient at BrightSmile?")
                step = 1
            elif "hour" in lower_input or "open" in lower_input:
                print_agent("We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. Would you like to schedule an appointment during these times?")
            else:
                print_agent("I can definitely help with that. Are you a new or returning patient at BrightSmile, so I can fetch your record?")
                step = 1

        elif step == 1:
            # Patient status
            lower_input = user_input.lower()
            if "new" in lower_input:
                print_agent("Welcome! We'd love to have you. To get started, could you please tell me your full name and a good phone number to reach you at?")
                step = 2
            elif "returning" in lower_input or "exist" in lower_input:
                print_agent("Welcome back! Could you please tell me your full name and a good phone number to lookup your file?")
                step = 2
            else:
                # Assume new/general if input is unclear
                print_agent("Got it. To set up your appointment file, could you please tell me your full name and a good phone number to reach you?")
                step = 2

        elif step == 2:
            # Gathers name & phone
            # Basic parsing of name or phone
            sarah_name = user_input
            print_agent(f"Got it. Thank you. Now, let's look at the schedule. Dr. Aris has openings this coming Tuesday, June 16th. We have slots at 10:00 AM, 1:30 PM, and 4:00 PM. Do any of those work for you?")
            step = 3

        elif step == 3:
            # Gathers time slot
            lower_input = user_input.lower()
            if "1:30" in lower_input or "one" in lower_input:
                chosen_time = "Tuesday, June 16th at 1:30 PM"
            elif "10" in lower_input or "ten" in lower_input:
                chosen_time = "Tuesday, June 16th at 10:00 AM"
            elif "4" in lower_input or "four" in lower_input:
                chosen_time = "Tuesday, June 16th at 4:00 PM"
            else:
                chosen_time = user_input # Fallback to user custom input

            print_agent(f"Excellent choice. Just to confirm, I have you down for a cleaning and a toothache exam with Dr. Aris this Tuesday, June 16th, at 1:30 PM. Does that all look correct?")
            step = 4

        elif step == 4:
            # Confirms
            lower_input = user_input.lower()
            if "yes" in lower_input or "correct" in lower_input or "right" in lower_input or "sure" in lower_input:
                print_agent("Perfect. I’ve reserved that spot for you. You’ll receive a confirmation text shortly with our address and a link to fill out your new patient forms online to save time. Is there anything else I can help you with today?")
                step = 5
            else:
                print_agent("My apologies! Let's correct that. Dr. Aris has openings this coming Tuesday at 10:00 AM, 1:30 PM, and 4:00 PM. Which of those should I lock in?")
                step = 3

        elif step == 5:
            # Ends call
            print_agent("You're very welcome! We look forward to seeing you on Tuesday. Have a great day!")
            time.sleep(1)
            print_system("[Call Ended]")
            print_system("System: Booking synchronized with BrightSmile live calendar backend successfully.")
            break

if __name__ == "__main__":
    main()
