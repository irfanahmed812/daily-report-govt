import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

export default function UnionForm() {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    // const [result, setResult] = useState("");
    const [currentDate, setCurrentDate] = useState(getDate());

    const onSubmit = (data) => {
        // console.log(data);
        // setResult(data)
        // console.log(data.union);

        // জন্ম নিবন্ধনের তথ্য
        const birthMale1 = parseInt(data.birthMale1);
        const birthFemale1 = parseInt(data.birthFemale1);
        const birthSum1 = birthMale1 + birthFemale1;

        const birthMale2 = parseInt(data.birthMale2);
        const birthFemale2 = parseInt(data.birthFemale2);
        const birthSum2 = birthMale2 + birthFemale2;

        // মৃত্যু নিবন্ধনের তথ্য
        const deathMale1 = parseInt(data.deathMale1);
        const deathFemale1 = parseInt(data.deathFemale1);
        const deathSum1 = deathMale1 + deathFemale1;

        const deathMale2 = parseInt(data.deathMale2);
        const deathFemale2 = parseInt(data.deathFemale2);
        const deathSum2 = deathMale2 + deathFemale2;

        fetch('https://sheetdb.io/api/v1/1uy03dxlt0hhj', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [{
                    তারিখ: data.date,
                    ইউনিয়ন: data.union,
                    জন্মনিবন্ধন_১_বছরের_মধ্যে_পুরুষ: data.birthMale1,
                    জন্মনিবন্ধন_১_বছরের_মধ্যে_মহিলা: data.birthFemale1,
                    মোট_জন্ম_নিবন্ধন_১_বছরের_মধ্যে: birthSum1,
                    জন্ম_নিবন্ধন_১_বছরের_উর্ধ্বে_পুরুষ: data.birthMale2,
                    জন্ম_নিবন্ধন_১_বছরের_উর্ধ্বে_মহিলা: data.birthFemale2,
                    মোট_জন্ম_নিবন্ধন_১_বছরের_উর্ধ্বে: birthSum2,
                    মৃত্যু_নিবন্ধন_১_বছরের_মধ্যে_পুরুষ: data.deathMale1,
                    মৃত্যু_নিবন্ধন_১_বছরের_মধ্যে_মহিলা: data.deathFemale1,
                    মোট_মৃত্যু_নিবন্ধন_১_বছরের_মধ্যে: deathSum1,
                    মৃত্যু_নিবন্ধন_১_বছরের_উর্ধ্বে_পুরুষ: data.deathMale2,
                    মৃত্যু_নিবন্ধন_১_বছরের_উর্ধ্বে_মহিলা: data.deathFemale2,
                    মোট_মৃত্যু_নিবন্ধন_১_বছরের_উর্ধ্বে: deathSum2
                }]
            })
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                toast.success('Data submited successfully')
                reset();
            }).catch((err) => {
                toast.error("Something went wrong! Please reload the page and try again")
            })

    }





    // console.log(result);

    // console.log(watch("example"))

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="!py-28 flex justify-center px-2 md:px-0">
            <Card className="w-full max-w-xl">
                <div className="py-5 px-7">
                    <h4 className="text-2xl font-medium text-black text-center">গজারিয়া উপজেলা দৈনিক জন্ম-মৃত্যু নিবন্ধন রিপোর্ট</h4>
                    <p className="text-red-600 mt-3">* Indicates required question</p>
                    <p className="text-end text-medium font-semibold mt-2">Today: {currentDate}</p>
                </div>

                <CardBody className="p-4 md:p-6">

                    <div className="my-4">
                        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                            Date <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("date", { required: true })}
                                id="date"
                                name="date"
                                type="date"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.date && <span className="text-red-600 text-sm">This field is required</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="union" className="block text-sm font-medium leading-6 text-gray-900">
                            ইউনিয়ন <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <select {...register("union", { required: true })}
                                id="union"
                                name="union"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select union</option>
                                <option value="হোসেন্দী">হোসেন্দী</option>
                                <option value="বালুয়াকান্দি">বালুয়াকান্দি</option>
                                <option value="টেংগারচর">টেংগারচর</option>
                                <option value="ভবেরচর">ভবেরচর</option>
                                <option value="বাউশিয়া">বাউশিয়া</option>
                                <option value="গুয়াগাছিয়া">গুয়াগাছিয়া</option>
                                <option value="ইমামপুর">ইমামপুর</option>
                                <option value="গজারিয়া">গজারিয়া</option>
                            </select>
                            {errors.union && <span className="text-red-600 text-sm">This field is required</span>}
                        </div>
                    </div>

                    {/* জন্ম নিবন্ধনের তথ্য */}
                    <div className="my-2">
                        <h4 className="text-center text-xl font-medium">জন্ম নিবন্ধনের তথ্য</h4>
                    </div>
                    <div className="my-4">
                        <label htmlFor="birth_1_m" className="block text-sm font-medium leading-6 text-gray-900">
                            জন্ম নিবন্ধনের তথ্য (১ বছরের মধ্যে) পুরুষ <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("birthMale1", { required: true, min: 0 })}
                                id="birth_1_m"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.birthMale1 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="birth_1_f" className="block text-sm font-medium leading-6 text-gray-900">
                            জন্ম নিবন্ধনের তথ্য (১ বছরের মধ্যে) মহিলা <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("birthFemale1", { required: true, min: 0 })}
                                id="birth_1_f"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.birthFemale1 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="birth_2_m" className="block text-sm font-medium leading-6 text-gray-900">
                            জন্ম নিবন্ধনের তথ্য (১ বছরের  উর্ধ্বে) পুরুষ <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("birthMale2", { required: true, min: 0 })}
                                id="birth_2_m"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.birthMale2 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="birth_1_f" className="block text-sm font-medium leading-6 text-gray-900">
                            জন্ম নিবন্ধনের তথ্য (১ বছরের  উর্ধ্বে) মহিলা <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("birthFemale2", { required: true, min: 0 })}
                                id="birth_1_f"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.birthFemale2 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    {/* মৃত্যু নিবন্ধনের তথ্য */}
                    <div className="my-2">
                        <h4 className="text-center text-xl font-medium">মৃত্যু নিবন্ধনের তথ্য</h4>
                    </div>
                    <div className="my-4">
                        <label htmlFor="death_1_m" className="block text-sm font-medium leading-6 text-gray-900">
                            মৃত্যু নিবন্ধনের তথ্য (১ বছরের মধ্যে) পুরুষ <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("deathMale1", { required: true, min: 0 })}
                                id="death_1_m"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.deathMale1 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="death_1_f" className="block text-sm font-medium leading-6 text-gray-900">
                            মৃত্যু নিবন্ধনের তথ্য (১ বছরের মধ্যে) মহিলা <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("deathFemale1", { required: true, min: 0 })}
                                id="death_1_f"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.deathFemale1 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="death_2_m" className="block text-sm font-medium leading-6 text-gray-900">
                            মৃত্যু নিবন্ধনের তথ্য (১ বছরের  উর্ধ্বে) পুরুষ <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("deathMale2", { required: true, min: 0 })}
                                id="death_2_m"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.deathMale2 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>
                    <div className="my-4">
                        <label htmlFor="death_2_f" className="block text-sm font-medium leading-6 text-gray-900">
                            মৃত্যু নিবন্ধনের তথ্য (১ বছরের  উর্ধ্বে) মহিলা <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="mt-2">
                            <input {...register("deathFemale2", { required: true, min: 0 })}
                                id="death_2_f"
                                placeholder="Your answer"
                                type="number"
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-slate-200 sm:text-sm sm:leading-6"
                            />
                            {errors.deathFemale2 && <span className="text-red-600 text-sm">This field is required. Minimum: 0</span>}
                        </div>
                    </div>

                </CardBody>
                <div className="px-7 py-6 flex justify-between items-center">
                    <button onClick={() => reset()} className="px-4 py-2 rounded-md border-black font-medium border-2 text-medium text-black hover:bg-gray-200 transition duration-200">
                        Reset
                    </button>
                    <button type="submit" className="px-4 py-2 rounded-md border-black font-medium border-2 text-medium bg-black text-white hover:bg-black/90 transition duration-200">
                        Submit
                    </button>
                </div>
            </Card>
        </form>
    );
}
