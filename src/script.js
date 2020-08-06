var showProjects = (data) => {
    var container = document.querySelector(".project_container");
    // var project_post_template = document.querySelector("#project_post_template");
    
    var projects = data.projects;
    
    Object.keys(projects).forEach(el => {
        var project_post_template = "<section class=\"post\"> <a class=\"plink\" href=\"--LINK--\"> <header class=\"post-header\"> <h2 class=\"post-title\">--NAME--</h2> </header> <div class=\"post-description\"> <p class=\"post-description-content\">--DESCRIPTION--</p> </div> </a> </section>";
        
        project_post_template = project_post_template.replace("--LINK--", projects[el].link);
        project_post_template = project_post_template.replace("--NAME--", el);
        project_post_template = project_post_template.replace("--DESCRIPTION--", projects[el].description);
        
        container.innerHTML += project_post_template;
    });
};



fetch("src/project.json").then(response => {
    var data = response.json();
    showProjects(JSON.parse(data));
}).catch(err => {
    console.log("Cant fetch file.\nError:" + err);
    var data = '{\"projects\":{\"Snake Xenia\":{\"description\":\"A classic snake Xenia game\",\"link\":\"https://nishantchauhan00.github.io/Snake_Game\"},\"Sudoku\":{\"description\":\"Sudoku game with solver and checker\",\"link\":\"https://nishantchauhan00.github.io/Sudoku\"},\"Chatbox\":{\"description\":\"Create rooms, chat and leave.\",\"link\":\"https://chatbox-n.herokuapp.com/\"},\"Splitwise\":{\"description\":\"Use spliwise to minimize Cash Flow\",\"link\":\"https://nishantchauhan00.github.io/Splitwise\"},\"Covid Fighter\":{\"description\":\"Protect the hero from coronovirus\",\"link\":\"https://nishantchauhan00.github.io/Covid_Fighter/\"},\"Spin Wheel\":{\"description\":\"Spin the wheel!\",\"link\":\"https://nishantchauhan00.github.io/Spin_Wheel/\"},\"Mario Jump\":{\"description\":\"A mario inspired game\",\"link\":\"https://nishantchauhan00.github.io/Mario_Jump/\"},\"Avengers\":{\"description\":\"Fan Page for marvel\'s first avengers\",\"link\":\"https://nishantchauhan00.github.io/Avengers\"}}}';
    showProjects(JSON.parse(data));    
});


