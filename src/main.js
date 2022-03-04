import Navigo from "navigo";
import Index from "./pages/admin";
import Add from "./pages/admin/add";
import Edit from "./pages/admin/edit";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const render = async (component, id) => {
  document.querySelector("#app").innerHTML = await component.print(id);
  if (component.after) await component.after(id);
};

router.on({
  "/": ()=>{
    render(Index)
  },
  "/product/:id/edit": (res)=>{
    render(Edit, res.data.id)
  },
  "/product/add":()=>{
    render(Add)
  }
});

router.resolve();
