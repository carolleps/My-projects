var model = [
    {
        "name":"Doggy",
        "src": "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=42;6",
        "alt": "a dog",
        "clicks": "0",
        "nickname": "kiki",
        "color": "white"
    },
    {
        "name": "Kitty", 
        "src": "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
        "alt": "a kitty",
        "clicks": "0",
        "nickname": "shakira",
        "color": "yellow"

    },
    {
        "name": "Nana",
        "src": "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
        "alt": "a bunny",
        "clicks": "0",
        "nickname": "kikito",
        "color": "beige"

    }]


var view = function(data){
    this.name = data.name;
    this.count = ko.observable(parseInt(data.clicks));
    this.imgSrc = ko.observable(data.src);
    this.alt = ko.observable(data.alt);
    this.nickname = ko.observable(data.nickname);
    this.level = ko.computed(function(){
        if (this.count() == 0){
            return 'Newborn';
        }
        else if (this.count() < 2) {
            return 'Baby';
        }
        else if (this.count() < 6) {
            return 'Toddler';
        }
        else if (this.count() < 12) {
            return 'Child';
        }
        else if (this.count() < 20) {
            return 'Teen';
        }
        else {
            return 'don\'t botter';
        }
    }, this);

}

var vm = function(){
    var that = this;    

    this.catArray = ko.observableArray([]);

    model.forEach(function(catItem){
            that.catArray.push(new view(catItem));
        })

    this.currentView = ko.observable(this.catArray()[0]);

    this.incrementCounter = function(){
        that.currentView().count(that.currentView().count() + 1);
        };
    
    this.setCat = function(clickedAnimal){
        that.currentView(clickedAnimal);
    };

}

ko.applyBindings(new vm());
