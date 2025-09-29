@frontend
Feature: Form tests on the Contact pages

  Scenario: Send correct content in the contact form
    Given I visit "Contact Page"
    And I allow all cookies
    And I write "Test" in the "First Name"
    And I write "Test" in the "Last Name"
    And I write "test@company.com" in the "Email Address"
    And I write "1234567890" in the "Phone Number"
    And I write "Test" in the "Message"
    And I select "Support" in the "Subject"
    When I click on the "Submit button"
    And I solve the CAPTCHA
    Then I receive a success message "Your message was validated successfully. (Test only — no request was sent.)" in the "Success area" element on the contact page

  Scenario: Send form submission with required fields missing
    Given I visit "Contact Page"
    And I allow all cookies
    When I click on the "Submit button"
    Then I receive the required message in the "First Name"
    And I receive the validation message "First name is required" in the "First Name"
    
    Given I write "Test" in the "First Name"
    When I click on the "Submit button"
    Then I receive the required message in the "Last Name"
    And I receive the validation message "Last name is required" in the "Last Name"
    
    Given I write "Test" in the "Last Name"
    When I click on the "Submit button"
    And I receive the required message in the "Email Address"
    And I receive the validation message "Email is required" in the "Email Address"

    Given I write "test@company.com" in the "Email Address"
    When I click on the "Submit button"
    And I receive the required message in the "Message"
    And I receive the validation message "Message is required" in the "Message"

  Scenario Outline: Send incorrect content in the email field: <content>
    Given I visit "Contact Page"
    And I allow all cookies
    And I write <content> in the "Email Address"
    When I click on the "Submit button"
    Then I receive the validation message "Enter a valid email" in the "Email Address"
    Then I receive the invalid message in the "Email Address"
    Examples:
      | content               |
      | "test"                |
      | "test@"               |
    # | "test@test"           | # The scenario will not run because we have an issue here
    # | "test@test.test"      | # The scenario will not run because we have an issue here
      | "test@test.test@"     |
  
  Scenario Outline: Send incorrect content in the phone field: <content>
    Given I visit "Contact Page"
    And I allow all cookies
    And I write "Test" in the "First Name"
    And I write "Test" in the "Last Name"
    And I write "test@company.com" in the "Email Address"
    And I write "Test" in the "Message"
    And I write <content> in the "Phone Number"
    When I click on the "Submit button"
    Then I receive the validation message "Invalid phone format" in the "Phone Number"
    Then I receive the invalid message in the "Phone Number"
    Examples:
      | content        |
      | "1"            |
      | "123456"       |
      | "abc"          |
      | "1234567a"     |
  