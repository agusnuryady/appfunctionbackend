'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {

    async shows({response}) {
        const files = await File.query().select('*').fetch()
        return response.json(files)
    }

    async create({request, response}) {
        const attachment = request.file('file')
        const files = new File()
        files.name = request.input('name')
        files.description = request.input('description')
        if (attachment !== null) {
            files.file = `http://appexperiment.herokuapp.com/upload/files/${new Date().getTime()}.${attachment.subtype}`
            await attachment.move(Helpers.publicPath('upload/files'), {
                name: files.file
            })
        } else {
            files.file = ''
        }
        await files.save()
        try {
            return {
                'status':'success',
                data:files
            }
        } catch (error) {
            return error
        }
    }

    async read({params, response}) {
        const id = params.id
        const files = await File.query().select('*').where('id',id).fetch()
        return response.json(files)
    }
    

    async update({params, request, response}) {
        const id = params.id
        const attachment = request.file('file')
        const {name, description, file}  = request.all()
        if (attachment !== null) {
            file = `http://appexperiment.herokuapp.com/upload/files/${new Date().getTime()}.${attachment.subtype}`
            await attachment.move(Helpers.publicPath('upload/files'), {
                name: file
            })
        } else {
            file = ''
        }
        const updated = await File.query().where('id',id).update({name:name, description:description, file:file})
        return response.json(updated)
    }

    async delete({params, response}) {
        const id = params.id
        await File.query().where('id',id).delete()
        return response.send({message:'file has ben deleted'})
    }

    async clean({response}) {
        await File.query().select('*').delete()
        return response.send({message:'all file has ben deleted'})
    }

}

module.exports = FileController
