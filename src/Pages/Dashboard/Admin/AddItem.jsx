import { useForm } from "react-hook-form";
import Title from "../../../Shared/Tilte/Title";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
const image_api_key = import.meta.env.VITE_IMAGE_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`

const AddItem = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
  const { register, handleSubmit } = useForm();

  const onSubmit = async(data) => {
    const imageFile = {image : data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
        headers: {'content-type': 'multipart/form-data'}
    })
    console.log(res.data.data.display_url);
    if(res?.data?.success){
        const dataList = {
            name: data?.name,
            category: data?.category,
            recipe: data?.recipe,
            price: parseFloat(data?.price),
            image: res.data?.data?.display_url
        }

        const response = await axiosSecure.post('/menu', dataList)
        if(response.data.insertedId){
            toast.success("Menu added")
        }
    }
  };

  return (
    <div  className="min-h-screen py-5">
      <Title
        mainTitle="add an item"
        subTitle="What's new?"
      ></Title>
      <div className="p-10 bg-zinc-200 m-10 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option
                  disabled
                  value="default"
                >
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button type="submit" className="btn">
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddItem;
