class TasksController {
    constructor(view, listId, btnId, service) {
        this._tasksView = view;
        this._listId = listId;
        this._btnId = btnId;
        this._service = service;

        this._editedId = null;

        this._movingId = null;
        this._sourceColId = null;
        this._targetColId = null;
    }

    setBoard(board) {
        this._board = board;
    }

    setAddEditTaskController(addEditTaskController) {
        this._addEditTaskController = addEditTaskController;
    }

    get cancel() {
        return (event) => {
            event.preventDefault();
            this._editedId = null;
            this.init();
            event.stopPropagation();
        }
    }

    addColumn(form) {
        return (event) => {
            event.preventDefault();
            if(form.elements['name'].value.trim() !== '') {
                event.preventDefault();
                this._board.add(form.elements['name'].value); //!!!
                this._service.setBoardList().then(()=>{
                    this.init();
                });
            }
            event.stopPropagation();
        }
    }

    editColumn(form) {
        return (event) => {
            event.preventDefault();
            if(form.elements['name'].value.trim() !== '') {
                this._board.edit(this._editedId, form.elements['name'].value,) //!!!

                this._service.setBoardList().then(()=>{
                    this._editedId = null;
                    this._tasksView.displayTasks(this._board.get_all()); //!!!
                });
            }
            event.stopPropagation();
        }
    }

    get editMode() {
        return (event) => {
            event.preventDefault();
            this._tasksView.displayTasks(this._board.get_all()); //!!!
            this._tasksView.displayEditColumn(this._editedId, 'edit',
                'submit-edit',
                'cancel-edit');
            const editForm = document.getElementById('edit');
            editForm.elements['name'].value = this._board.get(this._editedId).name; //!!!
            const cancelButton = document.getElementById('cancel-edit');
            const submitButton = document.getElementById('submit-edit');
            cancelButton.addEventListener('click', this.cancel);
            submitButton.addEventListener('click', this.editColumn(editForm));
            event.stopPropagation();
        }
    }

    get addMode() {
        return (event) => {
            this._tasksView.displayTasks(this._board.get_all()); //!!!
            this._tasksView.displayAddColumn('add',
                'submit-add',
                'cancel-add');
            const addForm = document.getElementById('add');
            const cancelButton = document.getElementById('cancel-add');
            const submitButton = document.getElementById('submit-add');
            cancelButton.addEventListener('click', this.cancel);
            submitButton.addEventListener('click', this.addColumn(addForm));
            event.stopPropagation();
        }
    }

    get dragstartHandler() {
        return (event) => {
            let target = event.target;
            if (target.tagName === 'ARTICLE') {
                this._movingId = target.id;
                this._sourceColId = target.parentElement.id.split('-')[0];
            }
        }
    }

    get dragoverHandler() {
        return (event) => {
            event.preventDefault();
            let target = event.target;
            if (target.tagName === 'DIV') {
                if(target.id.split('-')[1]==='L') {
                    this._targetColId = target.id.split('-')[0];
                }
            }
        }
    }

    get dragendHandler() {
        return (event) => {
            if(this._movingId !== null && this._sourceColId !== null && this._targetColId !== null) {
                if(this._sourceColId !== this._targetColId) {
                    this._board.move(this._movingId, this._sourceColId, this._targetColId);
                    this._service.setBoardList().then(()=>
                        this._tasksView.displayTasks(this._board.get_all()));
                }
            }

            this._movingId = null;
            this._sourceColId = null;
            this._targetColId = null;
        }
    }

    get clickHandler() {
        return (event) => {
            event.preventDefault();
            let target = event.target.closest('i, h3')? event.target.parentElement: event.target;
            if (target.tagName === 'BUTTON') {
                const args = target.id.split('-');
                switch (args[1]){
                    case 'D':{
                        switch (args[0].split('_')[1]) {
                            case 'C':{
                                this._board.remove(args[0]);
                                this._service.setBoardList().then(()=>
                                    this._tasksView.displayTasks(this._board.get_all()));//!!!
                            } break;
                            case 'T':{
                                const colId = args[2];
                                const column = this._board.get(colId); //!!!
                                column.remove(args[0]);
                                this._service.setBoardList().then(()=>
                                    this._tasksView.displayTasks(this._board.get_all())); //!!!
                            } break;
                            default:break;
                        }
                    }break;
                    case 'E':{
                        switch (args[0].split('_')[1]) {
                            case 'C':{
                                this._editedId = args[0];
                                this.editMode(event);
                            } break;
                            case 'T':{
                                const column = this._board.get(args[2]); //!!!
                                this._addEditTaskController.setParams(this._board.name, column, args[0]);
                                this._addEditTaskController.init();
                            } break;
                            default:break;
                        }
                    }break;
                    case 'A':{
                        if(args[0].split('_')[1] === 'C') {
                            const column = this._board.get(args[0]); //!!!
                            this._addEditTaskController.setParams(this._board.name, column);
                            this._addEditTaskController.init();
                        }
                    }break;
                    default: break;
                }
            }
            else{
                event.stopPropagation();
            }
        }
    }

    init(){
        this._tasksView.displayMain(this._board.name);
        this._tasksView.displayTasks(this._board.get_all()); //!!!

        this._list = document.getElementById(this._listId);
        this._addButton = document.getElementById(this._btnId);

       this._list.addEventListener('click', this.clickHandler);

       this._list.addEventListener('dragstart', this.dragstartHandler);
       this._list.addEventListener('dragover', this.dragoverHandler);
       this._list.addEventListener('dragend', this.dragendHandler);

       this._addButton.addEventListener('click', this.addMode);
    }
}
