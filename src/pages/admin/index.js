import axios from "axios"

const Index = {
    async print(){
        const { data } = await axios.get("http://localhost:3001/products")
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
                ${data.map((Element)=>{
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
    },
    after(){
        const btn = document.querySelectorAll("button");
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
    }
}

export default Index