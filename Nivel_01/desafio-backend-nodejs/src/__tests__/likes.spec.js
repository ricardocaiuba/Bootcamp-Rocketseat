const request = require("supertest");
const index = require("../index");

describe("Likes", () => {
  it("should be able to give a like to the repository", async () => {
    const repository = await request(index)
      .post("/repositories")
      .send({
        title: "primeiros-passos-nodejs-v2",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs-v2",
        techs: ["Node", "Express", "Nodemon", "TypeScript"],
      });

    let response = await request(index).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 1,
    });

    response = await request(index).post(
      `/repositories/${repository.body.id}/like`
    );

    expect(response.body).toMatchObject({
      likes: 2,
    });

    let defaultValue = 10;
    for (let i = 0; i < defaultValue; i++) {
      response = await request(index).post(
        `/repositories/${repository.body.id}/like`
      );
    }

    expect(response.body).toMatchObject({
      likes: 2 + defaultValue,
    });
  });

  it("should not be able to like a repository that does not exist", async () => {
    const guidTest = "7186df30-a25d-4e8f-a960-cb96ca58bbee";
    await request(index).post(`/repositories/${guidTest}/like`).expect(400);
  });
});
