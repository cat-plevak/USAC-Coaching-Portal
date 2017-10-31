# USAC-Coaching-Portal
PROJECT:
We worked with USA Climbing to develop a tool to help their staff and coaches communicate more efficiently and effectively throughout the certification process for competition season. The current system for the administration at USAC involved bringing together information from multiple sources into an excel spreadsheet and putting it together by hand. We our app a coach and the staff can go to one place to submit and verify information.

TECHNOLOGIES USED:
To build this full stack application we used HTML5, CSS, Bootstrap, Javascript, jQuery, Express, PostgresSQL, Node, Cloudinary, Photoshop, Apple Music, Beer. Special thanks to Margo Hayes.

WORKFLOW:
Our group used Agile methodologies with the help of Trello, and GitHub version control with feature branch method with one master file.


USER STORIES:
-COACHES:
- be able to register
     - submit information
     - upload required fields
- check certification status, view profile
- be able to edit your own information

-ADMINISTRATOR:
- search for coaches: by name, by email, by team, by city (normalize data):
     - click to see view all information for that coach
     - being able to pop open models of file images (how do they view these images with s3)
- sub nav to view a list of:
     - view all certified coaches
     - view all pending coaches (certs or membership missing)
          - being able to review/change/certify
          - list view of all coaches with edit button that takes you to screen view of one coach
- automated emails to coaches when certifications are expiring:
     - this might be a stretch goal/ nice to have.
