@database
Feature: User management in the database

  Scenario: Insert a new user
    When I insert a user named "Lodgify"
    Then I should see a user named "Lodgify"

  Scenario: Query reservations for a specific user
    When I query the reservations for user <userName>
    Then I should see a reservation at hotel <hotelName> with check-in <checkInDate> and check-out <checkOutDate>
    Examples:
      | userName  | hotelName            | checkInDate   | checkOutDate  |
      | "Alisson" | "Hotel Lodgify"      | "2025-10-01"  | "2025-10-05"  |
      | "Gabi"    | "Yellow Ocean Hotel" | "2025-10-03"  | "2025-10-06"  |
  