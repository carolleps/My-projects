/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeeds has URL', function(){
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url.length).not.toBe(0);
                expect((feed.url).slice(0,7)).toBe('http://');
            });
         });


        /* loops through each feed`in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('allFeeds has name', function(){
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(feed.url.length).not.toBe(0);
            });
         });
    });


    describe('The menu', function(){ 

        /* ensures the menu element is hidden by default. 
         */
        it('is hidden', function () {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

        it('displays when clicked', function() {
            // click first time toggleClass
            $('a.menu-icon-link').click();
            //does the menu display when clicked?
            expect(document.body.className).not.toContain('menu-hidden');
            // click second time
            $('a.menu-icon-link').click();
            //does the menu hide when clicked again?
            expect(document.body.className).toContain('menu-hidden');
        });

    });

    describe('Initial Entries', function() {

        /* ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('there is at least one entry in the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        /* ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         */
        var $feedBefore;
        var $feedAfter;

        beforeEach(function(done) {
            loadFeed(1, function() {
                $feedBefore = $('.feed').html();
                done();
            });
        });

        it('changes the content when a new feed is loaded', function(done) {
            loadFeed(2, function() {
                $feedAfter = $('.feed').html();
                expect($feedBefore).not.toEqual($feedAfter);
                done();
            });
        });
    });
    
}());
