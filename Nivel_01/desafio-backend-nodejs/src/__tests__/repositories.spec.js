const request = require("supertest");
const index = require("../index");
const { isUuid } = require("uuidv4");

const recourse = "/repositories";

describe("Repositories", () => {
  it("should be able to create a new repository", async () => {
    const res = await request(index)
      .post(recourse)
      .send({
        title: "primeiros-passos-nodejs",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs",
        techs: ["Node", "Express", "Nodemon"],
      });

    expect(isUuid(res.body.id)).toBe(true);

    expect(res.body).toMatchObject({
      title: "primeiros-passos-nodejs",
      url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs",
      techs: ["Node", "Express", "Nodemon"],
      likes: 0,
    });
  });

  it("should be able to list the repositories", async () => {
    const repository = await request(index)
      .post("/repositories")
      .send({
        title: "primeiros-passos-nodejs",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs",
        techs: ["Node", "Express", "Nodemon"],
      });

    const response = await request(index).get("/repositories");

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: repository.body.id,
          title: "primeiros-passos-nodejs",
          url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs",
          techs: ["Node", "Express", "Nodemon"],
          likes: 0,
        },
      ])
    );
  });

  it("should be able to update repository", async () => {
    const repository = await request(index)
      .post("/repositories")
      .send({
        title: "primeiros-passos-nodejs",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs",
        techs: ["Node", "Express", "Nodemon"],
      });

    const response = await request(index)
      .put(`/repositories/${repository.body.id}`)
      .send({
        title: "primeiros-passos-nodejs-v2",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs-v2",
        techs: ["Node", "Express", "Nodemon", "TypeScript"],
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      title: "primeiros-passos-nodejs-v2",
      url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs-v2",
      techs: ["Node", "Express", "Nodemon", "TypeScript"],
    });
  });

  it("should not be able to update a repository that does not exist", async () => {
    await request(index)
      .put(`/repositories/2a09ab05-95fd-488a-b28d-9f0de37349a0`)
      .expect(400);
  });

  it("should not be able to update repository likes manually", async () => {
    const repository = await request(index)
      .post("/repositories")
      .send({
        title: "primeiros-passos-nodejs-v2",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs-v2",
        techs: ["Node", "Express", "Nodemon", "TypeScript"],
      });

    const response = await request(index)
      .put(`/repositories/${repository.body.id}`)
      .send({
        likes: 15,
      });

    expect(response.body).toMatchObject({
      likes: 0,
    });
  });

  it("should be able to delete the repository", async () => {
    const response = await request(index)
      .post("/repositories")
      .send({
        title: "primeiros-passos-nodejs-v2",
        url: "https://github.com/ricardocaiuba/primeiros-passos-nodejs-v2",
        techs: ["Node", "Express", "Nodemon", "TypeScript"],
      });

    await request(index)
      .delete(`/repositories/${response.body.id}`)
      .expect(204);

    const repositories = await request(index).get("/repositories");

    const repository = repositories.body.find((r) => r.id === response.body.id);

    expect(repository).toBe(undefined);
  });

  it("should not be able to delete a repository that does not exist", async () => {
    const guidTest = "69b347b3-6517-4641-b165-ff592a02b419";
    await request(index).delete(`/repositories/${guidTest}`).expect(400);
  });
});
