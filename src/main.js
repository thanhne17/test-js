import Navigo from "navigo";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (component, id) => {
  document.querySelector("#app").innerHTML = await component.render(id);
  if (component.afterRender) await component.afterRender(id);
};

router.on({
});

router.resolve();
