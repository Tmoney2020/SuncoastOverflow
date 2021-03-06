using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuncoastOverflow.Models;

namespace SuncoastOverflow.Controllers
{
    // All of these routes will be at the base URL:     /api/Questionss
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case QuestionssController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public QuestionsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Questionss
        //
        // Returns a list of all your Questions
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions(string filter)
        {
            if (filter == null)
            {
                return await _context.Questions.ToListAsync();

            }
            else
            {
                return await _context.Questions.Where(question => question.Tag.Contains(filter)).ToListAsync();
            }

        }

        // GET: api/Questionss/5
        //
        // Fetches and returns a specific question by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            // Find the question in the database using `FindAsync` to look it up by id
            var question = await _context.Questions.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (question == null)
            {
                // Return a `404` response to the client indicating we could not find a question with this id
                return NotFound();
            }

            //  Return the question as a JSON object.
            return question;
        }

        // PUT: api/Questionss/5
        //
        // Update an individual question with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Question
        // variable named question. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Question POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != question.ID)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in question to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from question
            _context.Entry(question).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!QuestionExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            // return Ok(question)
            //
            return NoContent();
        }

        // POST: api/Questionss
        //
        // Creates a new question in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Question
        // variable named question. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Question POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            // Indicate to the database context we want to add this new record
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetQuestion", new { id = question.ID }, question);
        }

        // DELETE: api/Questionss/5
        //
        // Deletes an individual question with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            // Find this question by looking for the specific id
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                // There wasn't a question with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Questions.Remove(question);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(question)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing question by the supplied id
        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(question => question.ID == id);
        }
    }
}
