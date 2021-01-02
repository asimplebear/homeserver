import flask
import helpers
bomb = helpers.bomb

app = flask.Flask(__name__)

@app.route('/', defaults = {"_route": "index.html"})
@app.route('/noscript', defaults = {"_route": "noscript.html"})
def main(_route):

    bomb.files, bomb.notes = helpers.list_assets()
    return flask.render_template(_route, bomb = bomb)


@app.route('/add-note', methods=["POST"])
def addnote():

    note = flask.request.form["note"]
    helpers.add_note(note)

    return flask.redirect(flask.url_for('main'))


@app.route('/remove-note/<hsh>')
def removenote(hsh):

    helpers.remove_note(hsh)

    return flask.redirect(flask.url_for('main'))


@app.route('/add-file', methods = ["POST"])
def addfile():

    rfob = flask.request.files["file"]
    name = rfob.filename

    helpers.add_file(rfob, name)

    return flask.redirect(flask.url_for('main'))


@app.route('/remove-file/<hsh>/<name>')
def removefile(hsh, name):

    helpers.remove_file(hsh, name)
    return flask.redirect(flask.url_for('main'))


@app.route('/deliver-file/<hsh>/<name>')
def deliverfile(hsh, name):

    path = helpers.deliver_path(hsh, name)

    return flask.send_file(path, attachment_filename="a")


@app.route('/add-desc/<hsh>/<name>', methods=['POST'])
def adddesc(hsh, name):

    desc = flask.request.form['desc']
    helpers.add_desc(hsh, name, desc)

    return flask.redirect(flask.url_for('main'))


if not helpers.pa:
    app.run(host = '0.0.0.0', port = 5000, debug = True)
