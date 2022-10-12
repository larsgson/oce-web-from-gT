import { useEffect, useState, useContext } from 'react'
import {
  Save as SaveIcon,
  Undo as UndoIcon,
  Redo as RedoIcon
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import { Card } from 'translation-helps-rcl'
import { BIBLE_AND_OBS } from '@common/BooksOfTheBible'
import { AuthContext } from '@context/AuthContext'
import { StoreContext } from '@context/StoreContext'
import { AppContext } from '@context/AppContext'
import React from 'react';
import CircularProgress from './CircularProgress'
import { saveToUserBranch } from '@utils/saveToUserBranch'

export default function ScriptureWorkspaceCard({
  id,
  bookId,
  data,
  classes,
  onClose: removeBook,
}) {

  const [usfmContent, setUsfmContent] = useState("Waiting...")

  const {
    state: {
      authentication,
    },
  } = useContext(AuthContext)

  const {
    state: {
      owner,
      server,
      languageId,
    },
  } = useContext(StoreContext)

  const { 
    state: {
        books,
        repoClient,
    },
    actions: {
    }
  } = useContext(AppContext)


  const SaveToolbarButton = ({onSave}) => {
    return <SaveIcon
      id='toolbar-save'
      className={classes.pointerIcon}
      onClick={
        () => {
          saveToUserBranch(bookId, owner, data, authentication, repoClient)
        }
      }
    />
  }
  const items = []
  const onRenderToolbar = ({items}) => [
    ...items,
    <SaveToolbarButton key="save-button" onSave={ () => alert("Save Toolbar Button clicked") }/>,
  ]

  return (
    <Card title={`${BIBLE_AND_OBS[bookId]} (${id.split('-')[1]})`} 
      classes={classes} 
      hideMarkdownToggle={true} 
      closeable={true}
      onClose={() => removeBook(id)}
      key={bookId}
      onRenderToolbar={onRenderToolbar}
      disableSettingsButton={true}
    >
      {
        data.perf 
        ?
        <div className="text-sm max-w-prose">
          <pre>{JSON.stringify(data.perf,null,4)}</pre>
        </div>
        :
        <CircularProgress/>

      }
    </Card>
  )
}

ScriptureWorkspaceCard.propTypes = {
  bookId: PropTypes.string,
  classes: PropTypes.object,
}

