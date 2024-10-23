import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res){
    if(req.method === "GET"){
        console.log("In GET API ROUTE");
        const {db} = await connectToDatabase();

        try{
            const pipeline = [
                {
                    $group:{
                        _id:null,
                        distinctDrugs:{
                            $addToSet: "$Drug_A"
                        }
                    }
                },
                {
                    $addFields:{
                        distinctDrugs:{
                            $setUnion:["$distinctDrugs", {$cond: [{$gt: ["$Drug_B", null]},  "$Drug_B", []]}]
                        }
                    }
                },
                {
                    $project:{_id:0, distinctDrugs:1}
                }
            ];

            const result = await db.collection('interactions').aggregate(pipeline).toArray();
            console.log("Result = ", result);

            return res.status(200).json({names:result[0]?.distinctDrugs || []});
        }
        catch(error){
            return res.status(500).json({message:"Internal server error", error:error.message})
        }
    }
    return res.status(400).json({message: "This route is not defined"});
}