import axios from "axios"
import { ReRender } from "../../ultils"

const Index = {
    async print(){
        const idCate = await axios.get("http://localhost:3001/categories");
        const { data } = await axios.get("http://localhost:3001/products?_sort=price&_order=asc")
        return /* html */ `
        ${idCate.data.map((Element)=>{
            return /* html */ `
                <button data-id="${Element.id}" class="sort mx-[10px]">Sort by cate${Element.id}</button>
            `
        }).join("")}
        <div class="display">
            <table>
                <thead>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th colspan="2"></th>
                </thead>
                <tbody>
                    ${data.map((Element)=>{
                        return /* html */ `
                        <tr class="id-${Element.id}">
                            <td>${Element.id}</td>
                            <td>${Element.name}</td>
                            <td><img src="${Element.img}" class="w-[100px]"></td>
                            <td>${Element.price}</td>
                            <td><button class="button" data-id="${Element.id}">Remove</button></td>
                            <td><a href="/product/${Element.id}/edit">Edit</a></td>
                        </tr>
                        `
                    }).join("")}
                </tbody>
                  </table>
        </div>
        `
    },
    after(){
        const btn = document.querySelectorAll(".button");
        btn.forEach((Element)=>{
            const id = Element.dataset.id;
            Element.addEventListener("click", async(e)=>{
                e.preventDefault();
                if (window.confirm("Are you sure??")) {
                    await axios.delete("http://localhost:3001/products/"+id);
                    document.querySelector(".id-"+id).remove()
                }
            })
        })

        const btnSort = document.querySelectorAll(".sort");
        btnSort.forEach((Element)=>{
            const id = Element.dataset.id;
            Element.addEventListener("click", (e)=>{
                e.preventDefault();
                const component = {
                    async print(){
                        const { data } = await axios.get(`http://localhost:3001/categories/${id}?_embed=products`)
                        return /* html */ `
                        <table>
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th colspan="2"></th>
                            </thead>
                            <tbody>
                                ${data.products.map((Element)=>{
                                    return /* html */ `
                                    <tr class="id-${Element.id}">
                                        <td>${Element.id}</td>
                                        <td>${Element.name}</td>
                                        <td><img src="${Element.img}" class="w-[100px]"></td>
                                        <td>${Element.price}</td>
                                        <td><button data-id="${Element.id}">Remove</button></td>
                                        <td><a href="/product/${Element.id}/edit">Edit</a></td>
                                    </tr>
                                    `
                                }).join("")}
                            </tbody>
                            </table>
                        `
                    }
                }
    
                ReRender(component, ".display")
            })
        })

    }
}

export default Index