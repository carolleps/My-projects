var bio = {
    "name": "Carolle Piedade",
    "role": "Web Developer",
    "contacts": {
        "mobile": "+61 0424610736",
        "email": "carolleps@gmail.com",
        "github": "carolleps",
        "blog": "carolle.me",
        "twitter": "http://twitter.com",
        "location": "Sydney - Australia"
    },
    "welcomeMessage": '"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."',
    "skills": ["Great attitude", "Problem solving", "Stunning smile"],
    "biopic": "http://carolle.me/images/carolle.JPG",

};

var education = {
    "schools":[{
        "name": "Sydney TAFE",
        "location": "Sydney, Australia",
        "degree": "Diploma",
        "majors": ["Website Development"], 
        "dates": "Jan/2016 - Jun-2016",
        "url": "https://ultimo-it.net/web/dip/"
    },{
        "name": "Sydney TAFE",
        "location": "Sydney, Australia",
        "degree": "Certificate IV",
        "majors": ["Programming"],
        "dates": "Jan/2015 - Dec/2015",
        "url": "http://sydneytafe.edu.au/"
    },{
        "name": "Unime University",
        "location": "Lauro de Freitas, Brazil",
        "degree": "Master",
        "majors": ["Orofacial myology"],
        "dates": "2010 - 2011",
        "url": "http://www.unime.edu.br/"
    },{
        "name": "University of State of Bahia",
        "location": "Salvador, Brazil",
        "degree": "Bachelor",
        "majors": ["Speech Pathology"],
        "dates": "2005 - 2010",
        "url": "http://www.uneb.br/salvador/dcv/fonoaudiologia/"  
    }],
    "onlineCourses":[{
        "title": "Front-end Web Developer Nanodegree",
        "courselink": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001",
        "school": "Udacity",
        "dates": "jul/2016 - current",
        "url": "https://www.udacity.com/"
    }]    
};

var work = {
    "jobs": [{
        "employer": "Unirb",
        "url": "http://www.unirb.edu.br/", 
        "title": "headteacher", 
        "location": "Salvador, Brazil",
        "dates": "2012 - 2014",
        "description": "Experience working as Acting headteacher of the degree in Speech Pathology and as teacher of the jornalism and Radialism courses"
    },{
        "employer": "Espaco Via Ponte",
        "url": "http://www.espacoviaponte.com.br/", 
        "title": "Speech Pathologist",
        "location": "Salvador, Brazil",
        "dates": "2012-2014",
        "description": "Experience in caring of kids with special needs"
    }]
};

var projects = {
    "projects": [{
        "title": "Email Template",
        "dates": "Jun/2016",
        "description": "a newsletter template created with HTML",
        "images": ["http://carolle.me/images/email-template.png"],
        "url": "http://carolle.me/email-template/"
    },{
        "title": "Portfolio",
        "dates": "Jun/2016",
        "description": "Page created as a sandbox to HTML and CSS",
        "images": ["http://carolle.me/images/carolle.JPG"],
        "url": "http://carolle.me/"
    },{
        "title": "Wordpress",
        "dates": "jan/2016 - jun/2016",
        "description": "Technical Journal with all my research for the Diploma in Web Dev",
        "images": ["http://carolle.me/images/wordpress.png"],
        "url": "https://carollepiedade.wordpress.com/"
    },{
        "title": "Drupal",
        "dates": "may/2016 - jun/2016",
        "description": "An e-commerce and blog website",
        "images": ["http://carolle.me/images/drupal.png"],
        "url": "http://carolle.me/drupal"
    }]
};

var data = '%data%';

bio.display = function(){
    var myName = HTMLheaderName.replace(data, bio.name);
    var myRole = HTMLheaderRole.replace(data, bio.role);
    var myMobile = HTMLmobile.replace(data, bio.contacts.mobile);
    var myEmail = HTMLemail.replace(data, bio.contacts.email);
    var myGit = HTMLgithub.replace(data, bio.contacts.github);
    var myBlog = HTMLblog.replace(data, bio.contacts.blog);
    var myTwitter = HTMLtwitter.replace(data, bio.contacts.twitter);
    var myLocation = HTMLlocation.replace(data, bio.contacts.location);
    var myMessage = HTMLwelcomeMsg.replace(data, bio.welcomeMessage);
    var myPic = HTMLbioPic.replace(data, bio.biopic);

    $("#header").prepend(myRole);
    $("#header").prepend(myName);
    $("#topContacts").append(myMobile);
    $("#topContacts").append(myEmail);
    $("#topContacts").append(myGit);
    $("#topContacts").append(myBlog);
    $("#topContacts").append(myTwitter);
    $("#topContacts").append(myLocation);
    $("#header").append(myPic);
    $("#header").append(myMessage);

    $("#header").append(HTMLskillsStart);
    if(bio.skills !== null){
        bio.skills.forEach(function(skill){
            var myskills = HTMLskills.replace(data, skill);
            $("#header").append(myskills);
        });
    };
    $("#footerContacts").append(myMobile, myEmail,myGit, myBlog, myLocation);
};

bio.display();

work.display = function(){
    $("#workExperience").append(HTMLworkStart);
    work.jobs.forEach(function(item) { 
        var myEmployerAndTitle = HTMLworkEmployer.replace(data, item.employer).replace("#", item.url).replace(" ",' target="_blank" ') + HTMLworkTitle.replace(data, item.title);
        $(".work-entry:last").append(myEmployerAndTitle);
        $(".work-entry:last").append(HTMLworkDates.replace(data, item.dates));
        $(".work-entry:last").append(HTMLworkLocation.replace(data, item.location));
        $(".work-entry:last").append(HTMLworkDescription.replace(data, item.description));
    });
};

work.display();

projects.display = function(){
    $("#projects").append(HTMLprojectStart);
    if(projects.projects !== null) {
        projects.projects.forEach(function(myproject) {
            $(".project-entry:last").append(HTMLprojectTitle.replace(data, myproject.title).replace("#", myproject.url).replace(" ",' target="_blank" '));
            $(".project-entry:last").append(HTMLprojectDates.replace(data, myproject.dates));
            $(".project-entry:last").append(HTMLprojectDescription.replace(data, myproject.description));
            myproject.images.forEach(function(pic){
                $(".project-entry:last").append(HTMLprojectImage.replace(data, pic));
            });
        });
    }
};

projects.display();

education.display = function(){   
    education.schools.forEach(function(school){
        $("#education").append(HTMLschoolStart);
        var mySchoolName = HTMLschoolName.replace(data, school.name).replace("#", school.url).replace(" ",' target="_blank" ');
        var mySchoolDegree = HTMLschoolDegree.replace(data, school.degree);
        var mySchoolDates = HTMLschoolDates.replace(data,school.dates);
        var mySchoolLocation = HTMLschoolLocation.replace(data, school.location);
        var mySchoolMajor = HTMLschoolMajor.replace(data, school.majors);
        $(".education-entry:last").append(mySchoolName + mySchoolDegree + mySchoolDates + mySchoolLocation + mySchoolMajor);
    });
    
    $("#education").append(HTMLonlineClasses);

    education.onlineCourses.forEach(function(online){
        $('#education').append(HTMLschoolStart);
        var myOnlineTitle = HTMLonlineTitle.replace(data, online.title).replace("#", online.courselink).replace(" ",' target="_blank" ');
        var myOnlineSchool = HTMLonlineSchool.replace(data, online.school);
        var myOnlineDates = HTMLonlineDates.replace(data, online.dates);
        var myOnlineURL = HTMLonlineURL.replace(data, online.url);
        $(".education-entry:last").append(myOnlineTitle + myOnlineSchool + myOnlineDates + myOnlineURL);
    });
};

education.display();

$("#mapDiv").append(googleMap);

//internationalize Name

$("#main").append(internationalizeButton);

function inName(name){
    var names = name.trim().split(" ");
    console.log(names); 
    var fname = names[0].slice(0,1).toUpperCase() + names[0].slice(1).toLowerCase();
    var lname = names[1].toUpperCase();
    console.log(fname+" "+lname);
    return fname + " " + lname;
};

//CSS changes
$("img").css({
    "border-radius": "50%", 
    "max-width": "150px", 
});
$("head").append("<link href='https://fonts.googleapis.com/css?family=Lato:400,300' rel='stylesheet' type='text/css'>");
$("*").css("font-family","'Lato', sans-serif");
$("h1").css({
    "color": "white",
    "text-shadow": "2px 2px 2px gray",
});
$("#header").css("background-color", "#294860");
$(".orange").css("background-color", "#294860");

