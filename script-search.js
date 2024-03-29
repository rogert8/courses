$(document).ready(function () {
    document.getElementById("search").focus();
	// document.getElementById("search").text = "a";
	// document.getElementById("search").mykeyup();

	var searchExp = new RegExp("", "i");
	displayCourses(searchExp);

});

$('#search').keyup(function () {
// $('#search').keyup(function mykeyup() {
	var searchField = $('#search').val();
	// var myExp = new RegExp(searchField, "i");
	var mySearchExp = new RegExp(searchField, "i");
	displayCourses(mySearchExp);
});

function displayCourses(myExp) {
	$.getJSON('courses.json', function (data) {
		var output = '<ul class="searchresults">';		
				$.each(data, function (key, val) {
					if (val.skills) {
						var skillsStr = val.skills.join(", ");
					}
					if (val.objectives) {
						var objectivesStr = val.objectives.join(", ");
					}	// objectives exist
					else {
						var objectivesStr = "";
					}	// noobjectives exist
		
					if (val.title.search(myExp) != -1  || val.instructor.search(myExp) != -1 || skillsStr.search(myExp) != -1 || objectivesStr.search(myExp) != -1) {
						output += '<li>';
						if (val.url) { //} != "") {
							output += '<h2>' + '<a href=\"' + val.url + '\" target=\"_blank\">'  + val.title + '</a>' + '</h2>';
						}	// url exists
						else {
							output += '<h2>' + val.title + '</h2>';
						}	// no url exists
		
						if (val.instructor && val.instructor[0] !== "") {
							output += '<p style="color: #05549e; font-weight: bold; font-family: Libre Baskerville;">' + 'Instructor(s): ' + val.instructor + '<p>';
						}	// isntructor exists
		
						if (val.skills && val.skills.length > 0 && val.skills[0] !== "") {
							output += '<h4 style="font-family: Libre Baskerville;">' + 'Skill(s) Covered' + '</h4>';
							var skillsStr = val.skills.join(", ");
							// output += '<p style="font-size: 0.85em;">' + val.skills.join(", ") + '<style="font-size: 1em;" /p>';
							if (skillsStr.length <= 90) {
								output += '<p>' + skillsStr + '</p>';
							}
							else {
								output += '<p style="font-size: 0.85em;">' + skillsStr + '<br /> <style="font-size: 1em;" /p>';
							}
						}	// skills exist
						
						if (val.certs && val.certs.length > 0 && val.certs[0] !== "") {
							var prefix = '';
							var completedString = '';
							var certString = ''
							for (var i = 0; i < val.certs.length; i++) {
								certString = val.certs[i];
								if (certString.substring(certString.length - 6) == 'LI.pdf') {
									prefix = 'LinkedIn Learning ';
								}
								else if (certString.substring(certString.length - 9) == 'NASBA.pdf') {
									prefix = 'NASBA ';
								}
								else if (certString.substring(certString.length - 7) == 'PMI.pdf') {
									prefix = 'Project Management Institute (PMI) ';
								}
								else  if (certString.substring(certString.length - 11) == 'CompTIA.pdf') {
									prefix = 'CompTIA ';
								}
								else {
									prefix = '';
								}
								  completedString = prefix + 'Certificate of Completion: ' + val.date_completed;
							output += '<p>' + '<a href=\"certspdf/' + certString + '\"target=\"_blank\"\">' + completedString + '</a>'+ '</p>';
							}	// for each certs array element
						}	// certs exist
		
						if (val.synopsis && val.synopsis !== "") {
							output += '<h4 style="font-family: Libre Baskerville;">' + 'Synopsis' + '</h4>';
							output += '<p>' + val.synopsis + '</p>';
						}	// synsopsis exists 
		
						if (val.objectives && val.objectives.length > 0 && val.objectives[0] !== "") {
							output += '<h4 style="font-family: Libre Baskerville;">' + 'Learning Objectives' + '</h4>';
							output += '<p>' + '&#8226; '+ val.objectives.join("<br />&#8226; ") + '</p>';
						}	// objectives exist
		
						if (val.comments && val.comments !== "") {
							output += '<h4 style="font-family: Libre Baskerville;">' + 'My Comments' + '</h4>';
							output += '<p>' + val.comments + '</p>';
						}	// comments exist
		
						output += '</li>';
					}
				});
				output += '</ul>';
				$('#update').html(output);
			}); //get JSON
		
}

// $(document).ready(function () {
//     document.getElementById("search").focus();
// 	// document.getElementById("search").innerHTML = "a";
// 	document.getElementById("search").mykeyup("a");

// });