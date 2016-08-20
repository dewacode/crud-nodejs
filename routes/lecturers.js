
/*
 * GET users listing.
 */

exports.list = function(req, res){
  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM lecturer', function (err, rows) {
      if (err)
        console.log("Error Selecting : %s", err);
        res.render('lecturers', {page_title: "Lecturers - NodeJS", data:rows});
    });
  });
};

exports.add = function (req, res) {
  res.render('add_lecturer', {page_title: "Add Lecturers - NodeJS"});
};

exports.edit = function (req, res) {
  var id = req.params.id;
  req.getConnection(function (err, connection) {
    connection.query('SELECT * FROM lecturer WHERE id = ?',[id],function (err, rows) {
      if (err)
        console.log("Error Selecting : %s", err);
      res.render('edit_lecturer', {page_title: "Edit Lecturers - NodeJS", data:rows});
    });
  });
};

exports.save = function(req,res){

  var input = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function (err, connection) {

    var data = {

      name    : input.name,
      address : input.address,
      email   : input.email,
      phone   : input.phone

    };

    var query = connection.query("INSERT INTO lecturer set ? ",data, function(err, rows)
    {

      if (err)
        console.log("Error inserting : %s ",err );

      res.redirect('/lecturers');

    });

    // console.log(query.sql); get raw query

  });
};

exports.save_edit = function(req,res){

  var input = JSON.parse(JSON.stringify(req.body));
  var id = req.params.id;

  req.getConnection(function (err, connection) {

    var data = {

      name    : input.name,
      address : input.address,
      email   : input.email,
      phone   : input.phone

    };

    connection.query("UPDATE lecturer set ? WHERE id = ? ",[data,id], function(err, rows)
    {

      if (err)
        console.log("Error Updating : %s ",err );

      res.redirect('/lecturers');

    });

  });
};

exports.delete = function(req,res){

  var id = req.params.id;

  req.getConnection(function (err, connection) {

    connection.query("DELETE FROM lecturer  WHERE id = ? ",[id], function(err, rows)
    {

      if(err)
        console.log("Error deleting : %s ",err );

      res.redirect('/lecturers');

    });

  });
};