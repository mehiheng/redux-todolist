export default class Todo{

    constructor(content){
        this.content = content;
        this.status = Todo.ACTIVE;
        this.viewId = new Date().getTime();
    }

    static get ACTIVE() {
        return "active";
    }

    static get COMPLETED() {
        return "completed";
    }

    
    complete(){
        this.status = Todo.COMPLETED;
    }

    reactive(){
        this.status = Todo.ACTIVE;
    }
}