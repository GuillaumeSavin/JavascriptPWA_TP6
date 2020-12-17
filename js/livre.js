class livre {
    constructor(name, style, dispo) {
        this.name = name;
        this.style = style;
        this.dispo = dispo;
    }

    toShow()
    {
        return "name: " + this.name + "\nstyle: " + this.style + "\ndispo: " + this.dispo;
    }
}


