import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import TaskMgmt from "./TaskMgmt";
import pretty from "pretty";

describe("Test Task Management Component", () => {
  let container = null;
  beforeEach(async () => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    const data = {
      id: 1,
      tasks: {
        asdfaksdfhkerwer1: {
          taskDedscription: "React",
          taskDate: "12-12-1212",
          done: false,
        },
        asdfaksdfhkerwer2: {
          taskDedscription: "Angular",
          taskDate: "12-12-1212",
          done: false,
        }, 
        asdfaksdfhkerwer3: {
          taskDedscription: "Dropwizard",
          taskDate: "12-12-1212",
          done: false,
        },
      },
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
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

  it("should render a greeting", () => {
    act(() => {
      render(<TaskMgmt />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"container-fluid\\">
        <div class=\\"row\\">
          <div class=\\"row\\">
            <div class=\\"col\\"></div>
            <div class=\\"col\\">
              <h2> Tasker</h2>
            </div>
            <div class=\\"col\\"></div>
          </div>
          <div class=\\"row\\">
            <div class=\\"col\\"></div>
            <div class=\\"col\\">
              <div class=\\"card\\">
                <div class=\\"card-body\\">
                  <div class=\\"card-title h5\\">Add Task</div>
                  <form class=\\"\\">
                    <div class=\\"mb-3 form-group\\"><label class=\\"form-label\\" for=\\"formBasicEmail\\">Description</label><input placeholder=\\"Description\\" type=\\"text\\" id=\\"formBasicEmail\\" class=\\"form-control\\" value=\\"\\"></div>
                    <div class=\\"mb-3 form-group\\"><label class=\\"form-label\\" for=\\"formBasicPassword\\">Date</label><input placeholder=\\"Date\\" type=\\"text\\" id=\\"formBasicPassword\\" class=\\"form-control\\" value=\\"\\"></div><button type=\\"button\\" class=\\"btn btn-primary\\">Save</button>
                  </form>
                </div>
              </div>
            </div>
            <div class=\\"col\\"></div>
          </div>
          <div style=\\"margin-top: 10px;\\" class=\\"row\\">
            <div class=\\"col\\"></div>
            <div class=\\"col\\">
              <div class=\\"card\\">
                <div class=\\"card-body\\">
                  <div style=\\"margin-top: 10px;\\" class=\\"card\\">
                    <div class=\\"card-body\\">asdfaksdfhkerwer1<div class=\\"row\\">
                        <div class=\\"col\\">
                          <div class=\\"card-title h5\\">React</div>
                          <p class=\\"card-text\\">12-12-1212</p>
                        </div>
                        <div class=\\"col\\"></div>
                        <div class=\\"align-middle col-md-1\\">
                          <div class=\\"form-check\\"><input type=\\"checkbox\\" id=\\"asdfaksdfhkerwer1\\" class=\\"form-check-input position-static\\"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style=\\"margin-top: 10px;\\" class=\\"card\\">
                    <div class=\\"card-body\\">asdfaksdfhkerwer2<div class=\\"row\\">
                        <div class=\\"col\\">
                          <div class=\\"card-title h5\\">Angular</div>
                          <p class=\\"card-text\\">12-12-1212</p>
                        </div>
                        <div class=\\"col\\"></div>
                        <div class=\\"align-middle col-md-1\\">
                          <div class=\\"form-check\\"><input type=\\"checkbox\\" id=\\"asdfaksdfhkerwer2\\" class=\\"form-check-input position-static\\"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style=\\"margin-top: 10px;\\" class=\\"card\\">
                    <div class=\\"card-body\\">asdfaksdfhkerwer3<div class=\\"row\\">
                        <div class=\\"col\\">
                          <div class=\\"card-title h5\\">Dropwizard</div>
                          <p class=\\"card-text\\">12-12-1212</p>
                        </div>
                        <div class=\\"col\\"></div>
                        <div class=\\"align-middle col-md-1\\">
                          <div class=\\"form-check\\"><input type=\\"checkbox\\" id=\\"asdfaksdfhkerwer3\\" class=\\"form-check-input position-static\\"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=\\"col\\"></div>
          </div>
        </div>
      </div>"
    `); /* ... gets filled automatically by jest ... */
  });
});
