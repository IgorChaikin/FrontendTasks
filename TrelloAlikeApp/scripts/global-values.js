Boards = new BoardList(null, null, null);

const authView = new AuthView('header','main','info');
const boardsView = new BoardsView(
    'header',
    'main',
    'board-list',
    'add-edit-form',
    'add-button');
const tasksView = new TasksView('main','col-list', 'add-button');
const addEditTaskView = new AddEditTaskView('main');

const apiService = new TrelloAlikeApiService(Boards);

const authController = new AuthController(authView,
    'login',
    'register',
    'auth-form',
    Boards,
    apiService);
const boardsController = new BoardsController(
    boardsView,
    'board-list',
    'add-edit-form',
    'to-boards',
    'logout',
    'add-button',
    apiService);
const tasksController = new TasksController(tasksView, 'col-list', 'add-button',
    apiService);
const addEditTaskController = new AddEditTaskController(addEditTaskView,
    apiService);

authController.setBoardsController(boardsController);
boardsController.setAuthController(authController);
boardsController.setTasksController(tasksController);
tasksController.setAddEditTaskController(addEditTaskController);
addEditTaskController.setTasksController(tasksController);

authController.init();

