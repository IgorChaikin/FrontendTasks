Boards = new BoardList('Example', '0');

Boards.add('Board1', 'red');
Boards.add('Board2', 'orange');

Boards.get('0_B').add('Column1-1');
Boards.get('0_B').add('Column1-2');

Boards.get('0_B').get('0_C').add(
    {
        name: 'Task1-1-1',
        description: 'desc',
        date: new Date(),
        color: 'red'
    });
Boards.get('0_B').get('0_C').add(
    {
        name: 'Task1-1-2',
        description: 'desc',
        date: new Date(),
        color: 'green'
    });
Boards.get('0_B').get('1_C').add(
    {
        name: 'Task1-2-1',
        description: 'desc',
        date: new Date(),
        color: 'orange'
    });
/*-------------------------------------------------------------------------------------------------------------------*/
const authView = new AuthView('header','main','info');
const boardsView = new BoardsView(
    'header',
    'main',
    'board-list',
    'add-edit-form',
    'add-button');
const tasksView = new TasksView('main','col-list', 'add-button');
const addEditTaskView = new AddEditTaskView('main');

const authController = new AuthController(authView, 'login', 'register', 'auth-form');
const boardsController = new BoardsController(
    boardsView,
    'board-list',
    'add-edit-form',
    'to-boards',
    'logout',
    'add-button');
const tasksController = new TasksController(tasksView, 'col-list', 'add-button');
const addEditTaskController = new AddEditTaskController(addEditTaskView);

authController.setBoardsController(boardsController);
boardsController.setAuthController(authController);
boardsController.setTasksController(tasksController);
tasksController.setAddEditTaskController(addEditTaskController);
addEditTaskController.setTasksController(tasksController);

authController.init();

