import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FormComponent({ list, onAdd }) {
  const [listElements, setListElements] = useState("");

  const [category, setCategory] = useState(list[0].category);
  const [newCategory, setNewCategory] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(list[0].category);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);
  const handleShowAddCategoryModal = () => setShowAddCategoryModal(true);
  const handleCloseDeleteCategoryModal = () =>
    setShowDeleteCategoryModal(false);
  const handleShowDeleteCategoryModal = () => setShowDeleteCategoryModal(true);

  const handleAddItems = (e) => {
    e.preventDefault();

    if (!listElements || !category) return;

    const separatedArray = Array.from(listElements.split(","));
    let newListOfElements = [];
    let listUpdated = list;

    separatedArray.forEach((value) =>
      newListOfElements.push({ name: value.trim(), bought: false })
    );

    listUpdated.forEach((e) => {
      if (e.category === category) {
        e.data.push(...newListOfElements);
      }
    });

    onAdd(listUpdated);
    setListElements("");
  };

  const handleAddNewCategory = (e) => {
    e.preventDefault();

    if (!newCategory) return;

    let listUpdated = list;

    listUpdated.push({
      id: Math.random(),
      category: newCategory,
      data: [],
    });

    onAdd(listUpdated);
    setListElements("");
    handleCloseAddCategoryModal();
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();

    if (!categoryToDelete) return;

    let listUpdated = list.filter((e) => e.category != categoryToDelete);

    onAdd(listUpdated);
    setListElements("");
    handleCloseDeleteCategoryModal();
  };

  return (
    <>
      <Accordion className="add-item">
        <Accordion.Item eventKey="0">
          <Accordion.Header>➕ ADD ITEM</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleAddItems}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write down elements separated by commas</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={listElements}
                  onChange={(e) => setListElements(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Category</Form.Label>

                <div className="category-wrapper">
                  <Form.Select
                    aria-label="Default select example"
                    className="category-selector"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {list.map((e) => (
                      <option key={e.id} value={e.category}>
                        {e.category}
                      </option>
                    ))}
                  </Form.Select>

                  <Button
                    className="category-new-btn"
                    variant="warning"
                    onClick={handleShowAddCategoryModal}
                  >
                    ➕
                  </Button>
                  <Button
                    className="category-new-btn"
                    variant="warning"
                    onClick={handleShowDeleteCategoryModal}
                  >
                    ➖
                  </Button>
                </div>
              </Form.Group>
              <Button
                onClick={handleAddItems}
                style={{ margin: "1rem 0rem" }}
                className="add-btn"
              >
                Add
              </Button>
            </Form>

            <Modal
              show={showAddCategoryModal}
              onHide={handleCloseAddCategoryModal}
            >
              <Modal.Header closeButton>
                <Modal.Title>New category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleAddNewCategory}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>New category name</Form.Label>

                    <Form.Control
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseAddCategoryModal}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddNewCategory}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showDeleteCategoryModal}
              onHide={handleCloseAddCategoryModal}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleDeleteCategory}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Select category to delete</Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      className="category-selector"
                      value={categoryToDelete}
                      onChange={(e) => setCategoryToDelete(e.target.value)}
                    >
                      {list.map((e) => (
                        <option key={e.id} value={e.category}>
                          {e.category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseDeleteCategoryModal}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleDeleteCategory}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default FormComponent;
