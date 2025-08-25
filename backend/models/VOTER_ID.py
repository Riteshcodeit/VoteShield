import re

def validate_voter_id(voter_id):
    constraints = {
        "Uniqueness": "Each voter ID number must be unique for every registered voter.",
        "FixedLength": 10,
        "Format": "A combination of uppercase letters and digits (e.g., ABC1234567).",
        "RegexPattern": r"^[A-Z]{3}[0-9]{7}$",
        "NonEditable": "Once issued, the voter ID number cannot be changed.",
        "DigitValidation": "Checksum validation may be required (if applicable).",
        "GovernmentIssued": "Must be assigned by the official election commission."
    }
    
    # Check length
    if len(voter_id) != constraints["FixedLength"]:
        return False, "Invalid Length: Voter ID must be exactly 10 characters long."

    # Check format using regex
    if not re.match(constraints["RegexPattern"], voter_id):
        return False, "Invalid Format: Voter ID must follow the pattern (e.g., ABC1234567)."

    # Additional validation (e.g., uniqueness, checksum) can be handled at the database level

    return True, "Valid Voter ID."

