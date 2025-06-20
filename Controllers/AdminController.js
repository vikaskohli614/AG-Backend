const asynchandler = require("express-async-handler");
const response = require("../Middlewares/responseMiddleware");
const cloudinary = require('../utils/cloudinary');
const { ServiceModel } = require("../Models/ServiceModel");
const { BlogModel } = require("../Models/BlogModel");
const { ContactUsModel } = require("../Models/ContactUsModel");


const AddServices = asynchandler(async (req, res) => {
    try {
        const { Name, Category, Description } = req.body;
        const files = req.files;

        if (!Name) return response.validationError(res, 'Name is required');
        if (!Category) return response.validationError(res, 'Category is required');
        if (!Description) return response.validationError(res, 'Description is required');
        if (!files || !files.Image || !Array.isArray(files.Image) || files.Image.length === 0) {
            return response.validationError(res, 'Image is required');
        }

        const ImageUpload = await cloudinary.uploader.upload(files.Image[0].path, {
            folder: 'User/Image',
        });

        const Newservice = new ServiceModel({
            Name,
            Category,
            Description,
            Image: ImageUpload.secure_url
        });

        await Newservice.save();

        return response.successResponse(res, Newservice, 'Service Created');

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
});

const GetAllService = asynchandler(async (req, res) => {
    try {
        const Service = await ServiceModel.find();

        return response.successResponse(res, Service, 'Get All Services')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const GetAService = asynchandler(async (req, res) => {
    try {
        const { id } = req.params

        const Service = await ServiceModel.findById(id);

        if (!Service) return response.notFoundError(res, 'Service Not Found')

        return response.successResponse(res, Service, 'Get A Service ')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const UpdateService = asynchandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Category, Description } = req.body;
        const files = req.files;

        const existingService = await ServiceModel.findById(id);
        if (!existingService) {
            return response.notFoundError(res, 'Service not found');
        }

        let updatedImageUrl = existingService.Image;
        if (files && files.Image && Array.isArray(files.Image) && files.Image.length > 0) {
            const ImageUpload = await cloudinary.uploader.upload(files.Image[0].path, {
                folder: 'User/Image',
            });
            updatedImageUrl = ImageUpload.secure_url;
        }

        existingService.Name = Name;
        existingService.Category = Category;
        existingService.Description = Description;
        existingService.Image = updatedImageUrl;

        await existingService.save();

        return response.successResponse(res, existingService, 'Service Updated');

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
});

const DeleteService = asynchandler(async (req, res) => {
    try {
        const { id } = req.params

        const Service = await ServiceModel.findByIdAndDelete(id);

        if (!Service) return response.notFoundError(res, 'Service Not Found')

        return response.successResponse(res, Service, 'Service Deleted')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const AddBlog = asynchandler(async (req, res) => {
    try {
        const { Title, Content, Category } = req.body;
        const files = req.files;

        if (!Title) return response.validationError(res, 'Title is required');
        if (!Content) return response.validationError(res, 'Content is required');
        if (!Category) return response.validationError(res, 'Category is required');
        if (!files || !files.Image || !Array.isArray(files.Image) || files.Image.length === 0) {
            return response.validationError(res, 'Image is required');
        }

        const ImageUpload = await cloudinary.uploader.upload(files.Image[0].path, {
            folder: 'User/Image',
        });

        const NewBlog = new BlogModel({
            Title,
            Content,
            Category,
            Image: ImageUpload.secure_url
        });

        await NewBlog.save();

        return response.successResponse(res, NewBlog, 'Blog Created');

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
});

const GetAllBlog = asynchandler(async (req, res) => {
    try {
        const Blog = await BlogModel.find();

        return response.successResponse(res, Blog, 'Get All Blogs')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const GetABlog = asynchandler(async (req, res) => {
    try {
        const { id } = req.params

        const Blog = await BlogModel.findById(id);

        if (!Blog) return response.notFoundError(res, 'Blog Not Found')

        return response.successResponse(res, Blog, 'Get A Blog ')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const UpdateBlog = asynchandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Content, Category } = req.body;
        const files = req.files;

        const existingBlog = await BlogModel.findById(id);
        if (!existingBlog) {
            return response.notFoundError(res, 'Blog not found');
        }

        let updatedImageUrl = existingBlog.Image;
        if (files && files.Image && Array.isArray(files.Image) && files.Image.length > 0) {
            const ImageUpload = await cloudinary.uploader.upload(files.Image[0].path, {
                folder: 'User/Image',
            });
            updatedImageUrl = ImageUpload.secure_url;
        }

        existingBlog.Title = Title;
        existingBlog.Content = Content;
        existingBlog.Category = Category;
        existingBlog.Image = updatedImageUrl;

        await existingBlog.save();

        return response.successResponse(res, existingBlog, 'Blog Updated');

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
});

const DeleteBlog = asynchandler(async (req, res) => {
    try {
        const { id } = req.params

        const Blog = await BlogModel.findByIdAndDelete(id);

        if (!Blog) return response.notFoundError(res, 'Blog Not Found')

        return response.successResponse(res, Blog, 'Blog Deleted')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})


const AddContactUs = asynchandler(async (req, res) => {
    try {
        const { Name, Email, Mobile,Service, Message } = req.body

        if (!Name) return response.validationError(res, 'Name is required');
        if (!Email) return response.validationError(res, 'Email is required');
        if (!Mobile) return response.validationError(res, 'Mobile is required');
        if (!Service) return response.validationError(res, 'Service is required');
        if (!Message) return response.validationError(res, 'Message is required');

        const NewContact = new ContactUsModel({
            Name,
            Email,
            Mobile,
            Service,
            Message
        })

        await NewContact.save()

        return response.successResponse(res, NewContact, 'Contact Created')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const GetAllContact = asynchandler(async (req, res) => {
    try {
        const Contact = await ContactUsModel.find();

        return response.successResponse(res, Contact, 'Get All Contact us')
    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

const DeleteContact = asynchandler(async (req, res) => {
    try {
        const { id } = req.params

        const Contact = await ContactUsModel.findByIdAndDelete(id);

        if (!Contact) return response.notFoundError(res, 'Contact Not Found')

        return response.successResponse(res, Contact, 'Contact Deleted')

    } catch (error) {
        console.log(error);
        return response.internalServerError(res, error)
    }
})

module.exports = {
    AddServices, GetAllService, GetAService, UpdateService, DeleteService,
    AddBlog, GetAllBlog, GetABlog, UpdateBlog, DeleteBlog,
    AddContactUs, GetAllContact, DeleteContact
}

