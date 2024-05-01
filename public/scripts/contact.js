$(document).ready(() => {
    $('#contactForm').submit((event) => {
      event.preventDefault();
  
      const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
      };
  
      $.ajax({
        type: 'POST',
        url: '/send-email',
        data: formData,
        success: (response) => {
          $('#statusMessage').text(response);
          $('#contactForm')[0].reset();
        },
        error: (error) => {
          $('#statusMessage').text('Error sending message.');
        }
      });
    });
  });
  