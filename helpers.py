import os


pa = ['mysite'] if 'pa' in os.listdir('.') else []

ppath = pa + ['templates', 'panels']
fpath = pa + ['static', 'assets', 'files']
npath = pa + ['static', 'assets', 'notes']


panelspath = os.path.join(*ppath)#'templates', 'panels')
filespath = os.path.join(*fpath)#'static', 'assets', 'files')
notespath = os.path.join(*npath)#'static', 'assets', 'notes')


os.makedirs(filespath, exist_ok = True)
os.makedirs(notespath, exist_ok = True)


def get_panels():

    panels = [os.path.join('panels', _) for _ in os.listdir(panelspath)]

    return panels

class Bomb(dict):
    '''
    dict with dot (attribute) notation
    '''
    def __init__(self, dic):

        for key, value in dic.items():
            self[key] = value
            self.__setattr__(key, value)


    def __setattr__(self, key, value):

        self.update({key: value})
        super(Bomb,self).__setattr__(key, value)

bomb = Bomb({})
bomb.panels = sorted(get_panels())


"""
├── assets
│   ├── files
│   │   └── 5619894160690596093
│   │       ├── 5619894160690596093   <-- text about file
│   │       └── p38.jpg               <-- file served
│   └── notes
│       └── 7024846916414506696       <-- has text
"""

def list_assets():
    """
    returns files = [..(hash, name of file, text description)..]
    and notes = [..(hash, text note)..]
    """
    files, notes = [], []

    lfs = os.listdir(filespath)
    for hsh in lfs:
        path = os.path.join(filespath, hsh)
        innards = os.listdir(path)
        path = os.path.join(path, hsh)
        with open(path, 'r') as rob:
            teckts = rob.read()
        innards.remove(hsh)
        fyle = innards[0]
        files.append((hsh, fyle, teckts))

    lns = os.listdir(notespath)
    for hsh in lns:
        with open(os.path.join(notespath, hsh)) as rob:
            teckts = rob.read()
        notes.append((hsh, teckts))

    return files, notes


def add_note(note):
    '''
    put a file whose name is <hash of the note> in
    static/notes with contents being <note>.
    '''
    note = note.strip()
    hsh = str(abs(hash(note.strip())))

    os.makedirs(notespath, exist_ok = True)

    path = os.path.join(notespath, hsh)
    with open(path, 'w') as wob:
        wob.write(note)


def remove_note(hsh):

    path = os.path.join(notespath, hsh)
    os.remove(path)


def add_file(rfob, name):

    hsh = str(abs(hash(name.strip())))

    path = os.path.join(filespath, hsh)
    os.makedirs(path, exist_ok=True)
    path = os.path.join(path, hsh)
    with open(path, 'w') as wob:
        wob.write('needs description')

    path = os.path.join(filespath, hsh, name)
    rfob.save(path)


def remove_file(hsh, name):

    path = os.path.join(filespath, hsh, hsh)
    os.remove(path)

    path = os.path.join(filespath, hsh, name)
    os.remove(path)

    path = os.path.join(filespath, hsh)
    os.rmdir(path)


def deliver_path(hsh, name):

    path = os.path.join(filespath, hsh, name)

    return path


def add_desc(hsh, name, desc):

    path = os.path.join(filespath, hsh, hsh)
    with open(path, 'w') as wob:
        wob.write(desc)
