import axios from "axios";
import $ from "jquery";
import validate from "jquery-validation"

const Add = {
    print(){
        return /* html */ `
        <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Product Information</h3>
            <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
            </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
            <form id="form">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
    
                    <div class="col-span-6 sm:col-span-4">
                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" name="price" id="price" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
    
                    <div class="col-span-6">
                    <label for="desc" class="block text-sm font-medium text-gray-700">Desc</label>
                    <input type="text" name="desc" id="desc" autocomplete="desc" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6">
                    <label for="create" class="block text-sm font-medium text-gray-700">CreatedAt</label>
                    <input type="text" name="create" id="create" autocomplete="create" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
    
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="img" class="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" name="img" id="img" autocomplete="address-level1" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
    
                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <img id="preview" src="https://member.imagineacademy.microsoft.com/sites/all/themes/custom/ita_members/images/microsoft-img.png">
                    </div>
                </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                </div>
            </div>
            </form>
        </div>
        </div>
    </div>
        `
    },

    after(){
        const file = document.querySelector("#img");
        let imgUploaded = ""
        file.addEventListener("change", ()=>{
            document.querySelector("#preview").src = URL.createObjectURL(file.files[0]);
        })

        $("#form").validate({
            rules:{
                name:{
                    required: true,
                    minlength: 5
                }
            },
            messages:{
                name:{
                    required: "no no no ",
                    minlength: "⚠️⚠️⚠️⚠️⚠️"
                }
            },
            submitHandler: (form)=>{
                async function AddHandler (dataApi) {
                    if (file.files[0]) {
                        const formData = new FormData();
                        formData.append("file", file.files[0]);
                        formData.append("upload_preset", "edlvdeks")

                        const {data} = await axios({
                            method: "POST",
                            data: formData,
                            url: "https://api.cloudinary.com/v1_1/djsbi0bma/image/upload"
                        })
                        imgUploaded = data.url;
                    }

                    await axios.post("http://localhost:3001/products",dataApi )
                }
                AddHandler(
                    {
                        createdAt: document.querySelector("#create").value,
                        name: document.querySelector("#name").value,
                        img: imgUploaded ? imgUploaded : document.querySelector("#preview").src,
                        desc: document.querySelector("#desc").value,
                        price: document.querySelector("#price").value,
                        id: "",
                        categoryId: 1
                }
                );
                form.reset()
            }
        })

    }
}

export default Add