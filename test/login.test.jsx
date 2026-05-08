import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

test("عرض رسالة خطأ عند ترك الحقول فارغة", () => {

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button"));

  expect(
    screen.getByText("جميع الحقول مطلوبة ❌")
  ).toBeInTheDocument();

});
