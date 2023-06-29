import React from "react";
import AppFunctional from "./AppFunctional";
import { render, fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


beforeEach(() => {
  render(<AppFunctional />);
});
test("yon hatasi metni gozukuyor mu?", async () => {
  fireEvent.click(document.querySelector("#down"));
  fireEvent.click(document.querySelector("#down"));
  const mesaj = screen.getByText(/Aşağıya gidemezsiniz/i);

  expect(mesaj).toBeInTheDocument();
});
test("inputa deger girildiginde value degisiyor mu?", async () => {
    fireEvent.change(document.querySelector('#email'), { target: { value: "abc@abc.com"} })
    expect(document.querySelector("#email")).toHaveValue("abc@abc.com")
});
test("bos mail iletince, hata mesaji gosteriyor mu?", async () => {
  fireEvent.click(document.querySelector("#submit"));
  await waitFor(() => {
    const errorMessage = screen.getByText(/Ouch: email is required/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
test("yon hatasi metni gozukuyor mu?", async () => {
    fireEvent.click(document.querySelector("#down"));
    fireEvent.click(document.querySelector("#right"));
    fireEvent.click(document.querySelector("#up"));
    fireEvent.click(document.querySelector("#left"));
    fireEvent.click(document.querySelector("#left"));
    fireEvent.click(document.querySelector("#up"));
    const mesaj = screen.getByText(/1,1/i);
    const mesajIki = screen.getByText(/6 kere ilerlediniz/i);
  
    expect(mesaj).toBeInTheDocument();
    expect(mesajIki).toBeInTheDocument();
  });
test("reset butonu degerleri sifirliyor mu?", async () => {
    fireEvent.click(document.querySelector("#down"));
    fireEvent.click(document.querySelector("#right"));
    fireEvent.change(document.querySelector('#email'), { target: { value: "abc@abc.com"} });

    expect(screen.getByText(/3,3/i)).toBeInTheDocument();
    expect(document.querySelector("#email")).toHaveValue();

    fireEvent.click(document.querySelector("#reset"))

    expect(screen.queryByText(/3,3/i)).not.toBeInTheDocument();
    expect(document.querySelector("#email")).not.toHaveValue();
})
