import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("تسجيل الدخول بنجاح", async () => {

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          success: true,
          user: { id: 1, name: "Tasneem" },
        }),
    })
  );

  const onLogin = jest.fn();

  render(
    <MemoryRouter>
      <Login onLogin={onLogin} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByRole("textbox"), {
    target: { name: "email", value: "test@test.com" },
  });

  fireEvent.change(screen.getByLabelText("كلمة المرور"), {
    target: { name: "password", value: "123456" },
  });

  fireEvent.click(screen.getByText("دخول"));

  await waitFor(() => {
    expect(localStorage.getItem("user")).toContain("Tasneem");
    expect(onLogin).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/Page");
  });
});
