Feature: Amazon Login Validation

  Scenario: Validate invalid login
    Given I open Amazon website
    When I click on sign in
    And I enter invalid email "invalid@test.com"
    And I continue login
    Then I should see login error message
