export interface ChangeLogItem {
  title: string;
  version: string;
  date: string;
  changes: ChangeDescription[];
}

interface ChangeDescription {
  type: ChangeType;
  descriptions: string[];
}

type ChangeType = 'feature' | 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
