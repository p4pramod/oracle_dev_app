import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import TaskMgmt from "./TaskMgmt";
import pretty from "pretty";


describe('Test Task Management Component', () => {

    let container = null;
    beforeEach(async () => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);

        const data = {
            "id": 1,
            "tasks": {
                "asdfaksdfhkerwer1": {
                    "taskDedscription": "React",
                    "taskDate": "12-12-1212",
                    "done": false
                },
                "asdfaksdfhkerwer2": {
                    "taskDedscription": "Angular",
                    "taskDate": "12-12-1212",
                    "done": false
                },
                "asdfaksdfhkerwer3": {
                    "taskDedscription": "Dropwizard",
                    "taskDate": "12-12-1212",
                    "done": false
                }

            }
        };

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(data)
            })
        );

        await act(async () => {
            render(<TaskMgmt />, container);
        });

    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });


    it("Test data loaded correctly from Server Data", () => {

        expect(container.textContent).toContain(" TaskerAdd TaskDescriptionDateSave");

        expect(container.textContent).toContain("React");
        expect(container.textContent).toContain("Angular");
        expect(container.textContent).toContain("Dropwizard");

    });

    it("Test new Task addition", () => {

        const taskDescriptionTxtBox = container.querySelector('des_txtbox');
        const taskDateTxtBox = container.querySelector('complition_dt_txtbox');

        act(() => {
            taskDescriptionTxtBox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        act(() => {
            taskDateTxtBox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });


        expect(container.textContent).not.toContain("React");
    });

    it("Test on Task completion task gets hidden", () => {

        const checkBox = container.querySelector('#asdfaksdfhkerwer1_completion_chkbox');

        act(() => {
            checkBox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(container.textContent).not.toContain("React");
    });
})