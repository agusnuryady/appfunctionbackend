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
            files.file = `${new Date().getTime()}.${attachment.subtype}`
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
            file = `${new Date().getTime()}.${attachment.subtype}`
            await attachment.move(Helpers.publicPath('upload/files'), {
                name: file
            })
        } else {
            file = ''
        }
        const updated = await File.query().where('id',id).update({name:name, description:description, file:file})
        return response.json(updated)
    }

    async delete({params, request, response}) {
        const id = params.id
        const uri = request.input('uri')
        const fs = Helpers.promisify(require('fs'))
        await fs.unlink(Helpers.publicPath(`upload/files/${uri}`))
        await File.query().where('id',id).delete()
        return response.send({message:'file has ben deleted'})
    }

    async clean({response}) {
        await File.query().select('*').delete()
        return response.send({message:'all file has ben deleted'})
    }

    async download({params, response}) {
        const uri = params.uri
        return response.download(Helpers.publicPath(`upload/files/${uri}`))
    }

}

module.exports = FileController
