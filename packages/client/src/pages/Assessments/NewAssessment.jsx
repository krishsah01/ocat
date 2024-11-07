/* eslint-disable sort-keys */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (assessment) => {
    try {
      const score = Number(assessment.previousContact) +
      Number(assessment.catAltercations) +
      Number(assessment.ownerAltercations) +
      Number(assessment.hissesAtStrangers);

      let riskLevel = ``;
      const risk = (scores) => {
        if (scores >= 0 && scores <= 1) { // calculates risk level
          riskLevel = `Low Risk`;
        } else if (scores >= 2 && scores <= 3) {
          riskLevel = `Medium Risk`;
        } else if (scores >= 4 && scores <= 5) {
          riskLevel = `High Risk`;
        }
        return riskLevel;
      };

      const formData = {
        catBehaviorInstrument: assessment.catBehaviorInstrument,
        catName: assessment.catName,
        catDob: assessment.catDob,
        risk: risk(score),
        score,
      };
      console.log(`Form Data to Submit:`, formData);
      await AssessmentService.submit(formData); // sending data to assessmentServices
      reset();
      console.log(`Form submitted successfully`);

      window.alert(`Form submitted successfully!`);
      window.location.reload();
    } catch (error) {
      console.error(`Error submitting form:`, error);
      window.alert(`There was an error submitting the form. Please try again.`);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      {/* Instrument Section */}
      <Form.Group className="mb-3" controlId="catBehaviorInstrument">
        <h2>Cat Assessment Info</h2>
        <Form.Label>Instrument</Form.Label> {
        }
        <Form.Control
          type="text"
          placeholder="Cat Behavior Instrument"
          disabled={true}
          {...register(`catBehaviorInstrument`, { required: false })}
        />
      </Form.Group>

      {/* Cat Details Section */}
      <Form.Group className="mb-3" controlId="catName">
        <h2>Cat Details</h2>
        <Form.Label>Cat Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Cat Name"
          {...register(`catName`, { required: true })}
        />
        {// {errors.catName && <span>This field is required</span>}
        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="catDob">
        <Form.Label>Cat Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Cat DOB"
          {...register(`catDob`, { required: true })}
        />
        {// {errors.catDob && <span>This field is required</span>}
        }
      </Form.Group>

      {/* Questions & Responses Section */}
      <h2>Questions & Responses</h2>

      <Form.Group className="mb-3" controlId="previousContact">
        <Form.Label>Previous Contact with the Cat Judicial System</Form.Label>
        <Form.Check
          type="radio"
          id="previousContactYes"
          label="Yes"
          value="1"
          {...register(`previousContact`, { required: true })}
        />
        <Form.Check
          type="radio"
          id="previousContactNo"
          label="No"
          value="0"
          {...register(`previousContact`, { required: true })}
        />
        {// {errors.hasPreviousContact && <span>This field is required</span>}
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="catAltercations">
        <Form.Label>Physical Altercations with Other Cats</Form.Label>
        <Form.Check
          type="radio"
          id="catAltercationsLessThanThree"
          label="0-3 altercations"
          value="0"
          {...register(`catAltercations`, { required: true })}
        />
        <Form.Check
          type="radio"
          id="catAltercationsMoreThanThree"
          label="3+ altercations"
          value="1"
          {...register(`catAltercations`, { required: true })}
        />
        {// {errors.catAltercations && <span>This field is required</span>}
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="ownerAltercations">
        <Form.Label>Physical Altercations with Owner (scratching, biting, etc...)</Form.Label>
        <Form.Check
          type="radio"
          id="ownerAltercationsLessThanTen"
          label="0-10 altercations"
          value="0"
          {...register(`ownerAltercations`, { required: true })}
        />
        <Form.Check
          type="radio"
          id="ownerAltercationsMoreThanTen"
          label="10+ altercations"
          value="1"
          {...register(`ownerAltercations`, { required: true })}
        />
        {// {errors.ownerAltercations && <span>This field is required</span>}
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="playsWithDogs">
        <Form.Label>Plays Well with Dogs</Form.Label>
        <Form.Check
          type="radio"
          id="playsWellWithDogsNo"
          label="No"
          value="1"
          {...register(`playsWithDogs`, { required: true })}
        />
        <Form.Check
          type="radio"
          id="playsWellWithDogsYes"
          label="Yes"
          value="0"
          {...register(`playsWithDogs`, { required: true })}
        />
        {// {errors.playsWithDogs && <span>This field is required</span>}
        }

      </Form.Group>

      <Form.Group className="mb-3" controlId="hissesAtStrangers">
        <Form.Label>Hisses at Strangers</Form.Label>
        <Form.Check
          type="radio"
          id="hissesAtStrangersNo"
          label="No"
          value="0"
          {...register(`hissesAtStrangers`, { required: true })}
        />
        <Form.Check
          type="radio"
          id="hissesAtStrangersYes"
          label="Yes"
          value="1"
          {...register(`hissesAtStrangers`, { required: true })}
        />
        {// {errors.hissesAtStrangers && <span>This field is required</span>}
        }
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
