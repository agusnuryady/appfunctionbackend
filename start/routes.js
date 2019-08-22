'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

    Route.get('files', 'FileController.shows')
    Route.get('file/read/:id', 'FileController.read')
    Route.post('file/create', 'FileController.create')
    Route.patch('file/update/:id', 'FileController.update')
    Route.delete('file/delete/:id', 'FileController.delete')
    Route.delete('file/clean', 'FileController.clean')
    Route.get('file/download/:uri', 'FileController.download')

}).prefix('api/v1')