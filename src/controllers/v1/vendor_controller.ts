import { Request, Response } from "express";
import { Vendor } from "../../entities/v1/vendor";
import { AppDataSource } from "../../db/typeorm";

const vendorRepo = AppDataSource.getRepository(Vendor);

const getAllVendors = async (req : Request, res : Response) => {
    try {
        const vendors = await vendorRepo.find();
        res.status(200).json({data : vendors, message : "All vendors fetched successfully.."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"});
    }
}

const createNewVendor = async (req : Request, res : Response) => {
    const {name} = req.body;
    console.log(name);
    try {
        const newVendor =  vendorRepo.create({
            name : name
        })
        await vendorRepo.save(newVendor);
        res.status(200).json({data : newVendor, message : "Vendor created successfully..."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export {getAllVendors, createNewVendor};