const BigPromises = require("../middlware/BigPromises")
const Course = require("../models/Course")
const { getUriData } = require("../utils/DataURi")
const ErrorHandler = require("../utils/ErrorHandler")
const cloudinary = require("cloudinary")
const Stats = require("../models/Stats")
const WhereClause=require('../utils/WhereClause')
exports.getAllCourse=BigPromises(async(req, res, next) =>{
    // const keyword = req.query.keyword || "";
    // const category = req.query.category || "";
    // const courses = await Course.find({
    //   title: {
    //     $regex: keyword,
    //     $options: "i",
    //   },
    //   category: {
    //     $regex: category,
    //     $options: "i",
    //   },
    // }).select("-lectures"); 
    const resultperPage=3
    const CourseCount=await Course.countDocuments(); 
    const coursesObj=  new WhereClause(Course.find().select("-lectures"),req.query)
    .search().filter()
  
    let courses=await coursesObj.base
    let filteredCoursesCount = courses.length;
      coursesObj.pager(resultperPage)

    courses=await coursesObj.base.clone()


    res.status(200).json({
      success: true,
      courses,
      filteredCoursesCount,
      CourseCount,
      resultperPage

    });
})
exports.getTrendingCourse=BigPromises(async(req, res, next) =>{
    const courses = await Course.find({views:{
        $gte:5
    }}).select("-lectures").limit(4); 
    res.status(200).json({
      success: true,
      trending:courses,
    });
})
exports.createCourse=BigPromises(async(req, res, next) =>{
    const{title,description,category,createdBy}=req.body
    console.log(title,description,category,createdBy);

    if(!title || !description || !category || !createdBy){
        return next(new ErrorHandler("Please add all feilds",400))
    }

    const file=req.file


/* {
  fieldname: 'file',
  originalname: 'ENTREPRENEURSHIP.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 01 7d 01 7d 00 00 ff ed 00 38 50 68 6f 74 6f 73 68 6f 70 20 33 2e 30 00 38 42 49 4d 04 04 00 00 00 00 00 00 ... 1086322 more bytes>,
  size: 1086372
 } */ 
    
 console.log(file)


 //When Pass in this function it give a binary value 
const fileUri=getUriData(file)


    const result=await cloudinary.v2.uploader.upload(fileUri.content,{

        folder:"eCourses/Courses"

    })
    
    await Course.create({
        title,description,category,createdBy,
        poster:{
            public_id:result.public_id,
            url:result.secure_url

        }
    })

    res.status(201).json({
        success: true,
        message:"Course created successfully"
    })
})

exports.getCourseLectures=BigPromises(async(req, res, next) =>{
    console.log(req.params.id);
    const courses=await Course.findById(req.params.id)

    if(!courses) return next(new ErrorHandler('Course not found',404));
      
    courses.views+=1

    await courses.save()

    res.status(200).json({
        success: true,
        courses:courses.lectures
    })
})

exports.addCourseLectures=BigPromises(async(req, res, next) =>{
    const{title,description}=req.body
    const courses=await Course.findById(req.params.id)

    if(!courses) return next(new ErrorHandler('Course not found',404));
     
    const file=req.file
    
  
    const fileUri=getUriData(file)


    const result=await cloudinary.v2.uploader.upload(fileUri.content,{

        folder:"eCourses/Videos",
        resource_type:"video"
        

    })
   
    courses.lectures.push({
        title,description,
        video:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })
    
    courses.noOfVideos=courses.lectures.length
    await courses.save()

    res.status(200).json({
        success: true,
        message:"Lecture Added successfully"
    })
})

exports.deleteCourse=BigPromises(async(req, res, next) =>{
    const course=await Course.findById(req.params.id)

    if(!course) return next(new ErrorHandler('Course not found',404));
     
    await cloudinary.v2.uploader.destroy(course.poster.public_id)

    for(let i = 0; i < course.lectures.length; i++) {
     
        const element=course.lectures[i]

        await cloudinary.v2.uploader.destroy(element.video.public_id,{
            folder:"eCourses/Videos",
            resource_type:"video"
        })

    }
  
    await course.remove()

    res.status(200).json({
        success: true,
        message:"Course Deleted Successfully"
    })
})

exports.deleteCourseLecture=BigPromises(async(req, res, next) =>{

    const{courseId,lectureId}=req.query
 
 
    const course=await Course.findById(courseId)


    if(!course) return next(new ErrorHandler('Course not found',404));
    
    const lecture=course.lectures.find((item)=>{
        if(item._id.toString()===lectureId.toString()) return item;
    })

     
    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
        folder:"eCourses/Videos",
        resource_type:"video"
    })

    
    course.lectures=course.lectures.filter((item)=>{
        if(item._id.toString()!==lectureId.toString()) return item;
    })

    course.noOfVideos=course.lectures.length
 

    await course.save()

    res.status(200).json({
        success: true,
        message:"Lecture Deleted Successfully"
    })
})


Course.watch().on("change", async()=>{
    const stats=await Stats.find({}).sort({createdAt:"desc"}).limit(1)
    const courses=await Course.find({})

   let  totalView=0

    for(let i=0; i<courses.length; i++) {

    totalView+=courses[i].views

    }
    stats[0].views=totalView;
    stats[0].createdAt=new Date(Date.now())

    await stats[0].save()

})



//Admin Routes

exports.admingetAllCourses= BigPromises(async (req, res, next) => {

    const courses=await Course.find({})

    res.status(200).json({
        success: true,
        courses
    })
})


