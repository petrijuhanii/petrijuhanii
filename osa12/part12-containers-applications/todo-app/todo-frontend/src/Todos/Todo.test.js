import React from "react"
import { render, screen } from "@testing-library/react"
import Todo from "./Todo"

const mockOnDelete = jest.fn()
const mockOnComplete = jest.fn()

test("False todo test", () => {
  const todo = {
    text: "Clean your house",
    done: false,
  }
  render(
    <Todo
      todo={todo}
      onClickComplete={mockOnComplete}
      onClickDelete={mockOnDelete}
    />
  )
  const text = screen.getByText("Clean your house")
  const isDone = screen.getByText("This todo is not done")
  expect(text).toBeDefined()
  expect(isDone).toBeDefined()
})