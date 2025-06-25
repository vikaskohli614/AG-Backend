const { AddServices, GetAllService, GetAService, UpdateService, DeleteService, AddBlog, GetAllBlog, GetABlog, UpdateBlog, DeleteBlog, AddContactUs, GetAllContact, DeleteContact, CreateOrUpdateTermsAndCondition, GetTermsandcondition, CreateOrUpdatePrivacyPolicy, GetPrivacyPolicy } = require("../Controllers/AdminController");
const multer = require("../utils/multer");
const router = require("express").Router();

const upload = multer.fields([
    { name: 'Image', maxCount: 1 },
    { name: 'UserImage', maxCount: 1 },
    { name: 'Images', maxCount: 5 },
]);

router.post("/AddServices", upload, AddServices);
router.get("/GetAllService", GetAllService);
router.get("/GetAService/:id", GetAService);
router.put("/UpdateService/:id", upload, UpdateService);
router.delete("/DeleteService/:id", DeleteService);
router.post("/AddBlog", upload, AddBlog);
router.get("/GetAllBlog", GetAllBlog);
router.get("/GetABlog/:id", GetABlog);
router.put("/UpdateBlog/:id", upload, UpdateBlog);
router.delete("/DeleteBlog/:id", DeleteBlog);
router.post("/AddContactUs", AddContactUs);
router.get("/GetAllContact", GetAllContact);
router.delete("/DeleteContact/:id", DeleteContact);
router.post("/CreateOrUpdateTermsAndCondition", CreateOrUpdateTermsAndCondition);
router.get("/GetTermsandcondition", GetTermsandcondition);
router.post("/CreateOrUpdatePrivacyPolicy", CreateOrUpdatePrivacyPolicy);
router.get("/GetPrivacyPolicy", GetPrivacyPolicy);

module.exports = router;
