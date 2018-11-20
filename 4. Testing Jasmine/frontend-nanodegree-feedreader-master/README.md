#Overview
This is a project within the Udacity Front-End Web Developer Nanodegree. THe main functionality of the sites is basically a web-based application that reads RSS feeds. Using Jasmine, I wrote a number of tests against a pre-existing Feed Reader to test the underlying business logic of the application as well as the event handling and DOM manipulation. Used Jasmine

#Run the application
Download the file and open index.html
You will need internet connection

#What are being tested?

1. Wrote a test to check all the defined variables
2. Wrote a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty
3. Wrote a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty
4. Wrote a test that ensures the menu element is hidden by default
5. WWrote rite a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display itself when clicked, and does it hide when clicked again?
6. Wrote a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container
7. Write a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes

