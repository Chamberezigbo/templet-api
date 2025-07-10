const path = require('path');

const {prisma} = require('../config/prismaDb');

exports.saveBusiness = async (req,res,next) => {
       try {
              const userId = req.user.userId;

              // Collect only provided fields from the request body
              const updateData = {};
              const fields = ['companyName', 'fullName', 'phone', 'address', 'websiteUrl', 'companyEmail'];
              fields.forEach(field => {
                     if (req.body[field] !== undefined) {
                            updateData[field] = req.body[field];
                     }
              });
              
              if (req.file) {
                     updateData.logo = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // Store the filename of the uploaded logo
              }

              // Check if user already has a business
              const existingBusiness = await prisma.business.findFirst({
                     where: {userId}
              })

              let business;
              if(existingBusiness){
                     business = await prisma.business.update({
                            where: {id: existingBusiness.id},
                            data: updateData,
                     })
              }else {
                     business = await prisma.business.create({
                            data: {
                                   ...updateData,
                                   userId,
                            }
                     })
              }

              res.status(200).json({success: true, message: 'Business successfully saved '})

       } catch (error) {
              next(error);
       }
}